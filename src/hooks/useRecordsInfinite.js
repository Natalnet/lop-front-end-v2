import _ from 'lodash'
import qs from 'qs'
import { useInfiniteQuery } from 'react-query'
import { v4 as uuidv4 } from 'uuid'

import { useDataProviderContext } from '@tootz/react-admin'

import getQuery from '../services/getQuery'
import objKeysToSnakeCase from '../utils/objKeysToSnakeCase'

const useRecordsInfinite = (resource, queryParams = {}, options = {}) => {
  const { httpClient } = useDataProviderContext()
  const { pagination, sort, filter, params } = objKeysToSnakeCase(queryParams)
  const getListKey = async ({ pageParam = 1 }) => {
    const query = getQuery({
      pagination: {
        ...pagination,
        page: pageParam
      },
      sort,
      filter
    })

    const res = await httpClient.get(
      `${resource}?${qs.stringify(query, {
        arrayFormat: 'brackets'
      })}`
    )

    return res.data
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
    ...rest
  } = useInfiniteQuery(
    [resource, pagination, sort, filter, params],
    getListKey,
    {
      getNextPageParam: lastGroup =>
        lastGroup.pagination.page < lastGroup.pagination.page_count &&
        lastGroup.pagination.page + 1
    }
  )

  const records = data
    ? data.pages.reduce((all, curr) => all.concat(curr.records), [])
    : []

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = !isLoading && !isError
  const isEmpty = !isLoading && !isError && records.length === 0

  // Deprecard
  const isReachingEnd = !isLoading && !hasNextPage

  return {
    records,
    pagination: _.get(data, `[${data?.length - 1}].pagination`, null),
    status,
    isLoading,
    isSuccess,
    isError,
    isEmpty,
    isReachingEnd,
    isFetching,
    isFetchingNextPage,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
    ...rest,

    size: isFetchingNextPage ? 2 : 1, // Deprecated, use isFetchingNextPage
    setSize: () => fetchNextPage() // Deprecated, use fetchNextPage
  }
}

export default useRecordsInfinite
export { getQuery }
