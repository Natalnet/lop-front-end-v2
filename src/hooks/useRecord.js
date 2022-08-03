import _ from 'lodash'
import qs from 'qs'
import { useQuery } from '@tanstack/react-query'

const useRecord = (
  resource,
  id,
  options = {
    retry: false,
    retryDelay: attempt =>
      Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000)
  },
  forceIdPresence = true,
  shouldFetch = true,
  query,
  action
) => {
  const readyToFetch =
    resource !== null && (forceIdPresence ? !!id : shouldFetch)
  const path = _.isFunction(resource)
    ? resource(id)
    : resource
    ? `${resource}${id ? '/' + id : ''}${action ? '/' + action : ''}${
        query
          ? '?' +
            qs.stringify(query, {
              arrayFormat: 'brackets'
            })
          : ''
      }`
    : null
  const { isLoading, isError, isSuccess, data, refetch, ...rest } = useQuery(
    [path],
    { enabled: !!readyToFetch, ...options }
  )
  const record = data
  const supInfo = _.omit(data, ['record', 'errors'])
  const errors = _.get(data, 'errors')

  return {
    record,
    errors,
    isLoading,
    isError,
    isSuccess,
    refetch,
    ...supInfo,
    ...rest
  }
}

export default useRecord
