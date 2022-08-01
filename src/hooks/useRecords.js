import _ from 'lodash'
import qs from 'qs'
import { useQuery } from '@tanstack/react-query'

import getQuery from '../services/getQuery'
import _handleDelete from '../services/handleDelete'

const useRecords = (
  resource,
  queryParams = {},
  options = {
    refetchInterval: 60000,
    refetchIntervalInBackground: 180000,
    retry: false,
    retryDelay: attempt =>
      Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000)
  }
) => {
  const readyToFetch = resource && !resource.includes('undefined')
  const { pagination, sort, filter, params } = queryParams
  const query = params ? params : getQuery({ pagination, sort, filter })
  const path = resource
    ? `${resource}?${qs.stringify(query, { arrayFormat: 'brackets' })}`
    : null

  const { isLoading, isError, isSuccess, data, refetch, ...rest } = useQuery(
    [path],
    { enabled: !!readyToFetch, ...options }
  )

  const records = data?.docs || data
  const supInfo = _.omit(data, ['records', 'pagination'])

  const handleDelete = (id, config) => _handleDelete(resource, id, config, {})

  return {
    records: data,
    ...supInfo,
    pagination: data?.pagination,
    isLoading,
    isError,
    isSuccess,
    isEmpty: isSuccess && data && records && records.length === 0,
    handleDelete,
    refetch,
    ...rest
  }
}

export default useRecords
export { getQuery }
