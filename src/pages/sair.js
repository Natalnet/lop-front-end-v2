import { useEffect } from 'react'

import { useSessionContext } from '../contexts/SessionContext'

const SignOutPage = () => {
  const { signOut } = useSessionContext()

  useEffect(() => {
    signOut()
  }, [])

  return <></>
}

export default SignOutPage
