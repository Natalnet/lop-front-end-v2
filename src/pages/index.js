import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useSessionContext } from '../contexts/SessionContext'

const HomePage = () => {
  const router = useRouter()
  const { isLoading, accessLevel, isAuthenticated } = useSessionContext()

  useEffect(() => {
    if (!isLoading) {
      console.log('isAuthenticated', isAuthenticated)
      if (isAuthenticated) router.push(`/${accessLevel}`)
      else router.push('/entrar')
    }
  }, [isAuthenticated])

  return <></>
}

export default HomePage
