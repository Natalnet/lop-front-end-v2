import { useCallback, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { LockClosedIcon } from '@heroicons/react/solid'

import { useSessionContext } from '../contexts/SessionContext'
import { api } from '../services/api'

const isDev = process.env.NODE_ENV === 'development'

const SignInPage = () => {
  const router = useRouter()
  const { setSession, accessLevel, isAuthenticated } = useSessionContext()
  const [email, setEmail] = useState(isDev ? 'wendellp.barreto@gmail.com' : '')
  const [password, setPassword] = useState(isDev ? '99545856' : '')
  const [msgEmail, setMsgEmail] = useState('')
  const [msgPass, setMsgPass] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState('')

  const handleLogin = useCallback(
    async e => {
      setLoading(true)
      e.preventDefault()

      try {
        const response = await api.post('/auth/authenticate', {
          email,
          password
        })
        const { token, user } = response.data

        setSession({
          token,
          accessLevel: user.profile,
          user: {
            ...user,
            avatarUrl: user.urlImage
          }
        })

        setLoading(false)
      } catch (err) {
        setLoading(false)
        setMsgEmail('')
        setMsgPass('')
        setMsg('')

        if (err.response && err.response.status === 400) {
          if (
            err.response.data.msg ===
            'O e-mail inserido não corresponde a nenhuma conta :('
          ) {
            setMsgEmail(err.response.data.msg)
          } else if (err.response.data.msg === 'Senha incorreta :(') {
            setMsgPass(err.response.data.msg)
          }
        } else {
          setMsg('Falha na conexão com o servidor :(')
        }
      }
    },
    [email, password]
  )

  useEffect(() => {
    if (isAuthenticated) router.push(`/${accessLevel}`)
  }, [isAuthenticated])

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="/logo.svg" alt="LoP" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Entre na sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ou{' '}
            <Link href="/cadastre-se" passHref>
              <a className="font-medium text-indigo-600 hover:text-indigo-500">
                cadastre-se
              </a>
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Lembre-se de mim
              </label>
            </div>

            <div className="text-sm">
              <Link href="/esqueci-a-senha" passHref>
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  Esqueceu sua senha?
                </a>
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

SignInPage.getLayout = page => {
  return (
    <>
      <>{page}</>
    </>
  )
}

export default SignInPage
