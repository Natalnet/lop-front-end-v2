import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect
} from 'react'

import _ from 'lodash'
import { useRouter } from 'next/router'

import ScreenLoading from '../components/ScreenLoading'

const SessionContext = createContext()

const useSessionContext = () => useContext(SessionContext)

const SessionProvider = ({ children }) => {
  const router = useRouter()
  const [isLoading, setIsloading] = useState(true)
  const [token, setToken] = useState('')
  const [accessLevel, setAccessLevel] = useState('')
  const [user, _setUser] = useState({
    name: '',
    email: '',
    urlImage: ''
  })

  const isAuthenticated = useMemo(
    () => !!(token && accessLevel && user.name && user.email),
    [user]
  )

  const setUser = (user = {}) =>
    _setUser({
      ...user,
      firstName: user.name ? user.name.split(' ')[0] : null
    })

  const setSession = useCallback(
    ({ token, accessLevel: _accessLevel, user }) => {
      console.log(token, _accessLevel, user)
      const accessLevel = _accessLevel.toLowerCase()

      setToken(token)
      setAccessLevel(accessLevel)
      setUser(user)

      sessionStorage.setItem('token', token)
      sessionStorage.setItem('accessLevel', accessLevel)
      sessionStorage.setItem('userName', user.name)
      sessionStorage.setItem('userEmail', user.email)
      sessionStorage.setItem('userAvatarUrl', user.avatarUrl)
    },
    []
  )

  const signOut = useCallback(() => {
    sessionStorage.clear()

    setUser({})

    router.push('/')
  }, [])

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    const accessLevel = sessionStorage.getItem('accessLevel')
    const name = sessionStorage.getItem('userName')
    const email = sessionStorage.getItem('userEmail')
    const avatarUrl = sessionStorage.getItem('userAvatarUrl')

    if (!(token && accessLevel && name && email)) router.push('/entrar')

    setToken(token)
    setAccessLevel(accessLevel)
    setUser({ name, email, avatarUrl })
    setIsloading(false)
  }, [])

  return (
    <SessionContext.Provider
      value={{
        isLoading,
        accessLevel,
        user,
        isAuthenticated,
        setSession,
        signOut
      }}
    >
      {isLoading ? <ScreenLoading /> : children}
    </SessionContext.Provider>
  )
}

// eslint-disable-next-line react/display-name
const withSession = (Component, props) => componentProps => {
  return (
    <SessionProvider {...componentProps} {...props}>
      <Component {...componentProps} {...props} />
    </SessionProvider>
  )
}

export { useSessionContext, SessionProvider, withSession }
