import _ from 'lodash'
import qs from 'qs'
import { useQuery } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'

const useRecord = (
  resource,
  id,
  options = {
    retry: false,
    retryDelay: attempt =>
      Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000)
  },
  forceIdPresence,
  shouldFetch = true,
  { query, action } = {}
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
    path || uuidv4(),
    { enabled: !!readyToFetch, ...options }
  )
  const record = data?.record
  const supInfo = _.omit(data, ['record', 'errors'])
  const errors = _.get(data, 'errors')

  return {
    record,
    errors,
    isLoading,
    isError,
    isSuccess,
    mutate: refetch,
    refetch,
    ...supInfo,
    ...rest
  }
}

export default useRecord
