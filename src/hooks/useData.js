import { useQuery } from '@tanstack/react-query'

const useData = (path, options = {}) => {
  const readyToFetch = !!path
  const { isLoading, isError, isSuccess, data, refetch, ...rest } = useQuery(
    path,
    { ...options, enabled: !!readyToFetch }
  )

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch,
    ...rest
  }
}

export default useData
