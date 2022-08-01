import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

const fetchSession = async () => {
  const res = await fetch('/api/auth/session')
  const session = await res.json()

  if (Object.keys(session).length) return session

  return null
}

const useSession = ({
  required,
  redirectTo = '/api/auth/signin?error=SessionExpired',
  queryConfig = {}
} = {}) => {
  const router = useRouter()
  const query = useQuery(['session'], fetchSession, {
    ...queryConfig,
    onSettled(data, error) {
      if (queryConfig.onSettled) queryConfig.onSettled(data, error)
      if (data || !required) return
      router.push(redirectTo)
    }
  })
  return query
}

export { fetchSession, useSession }
export default useSession
