import { useCallback, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSessionContext } from '../contexts/SessionContext'
import { api } from '../services/api'
import Button from '../components/Button'

const isDev = process.env.NODE_ENV === 'development'

const SignInPage = () => {
  const router = useRouter()
  const { setSession, accessLevel, isAuthenticated } = useSessionContext()
  const [email, setEmail] = useState(isDev ? 'wendellp.barreto@gmail.com' : '')
  const [password, setPassword] = useState(isDev ? '123123123' : '')
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
    if (isAuthenticated) router.push('/')
  }, [isAuthenticated])

  return (
    <div className="h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 antialiased">
      <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
        <div className="w-[108rem] flex-none flex justify-end">
          <picture>
            <source srcSet="/1.avif" type="image/avif" />
            <img
              src="/2.png"
              alt=""
              className="w-[71.75rem] flex-none max-w-none dark:hidden"
            />
          </picture>
          <picture>
            <source srcSet="/3.avif" type="image/avif" />
            <img
              src="/4.png"
              alt=""
              className="w-[90rem] flex-none max-w-none hidden dark:block"
            />
          </picture>
        </div>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-14 w-auto" src="/logo.png" alt="Workflow" />
        <h2 className="mt-6 text-center text-3xl font-bold text-slate-900 dark:text-gray-200">
          Entre na plataforma
        </h2>
        <p className="mt-2 text-center text-sm">
          ou{' '}
          <Link href="/cadastre-se" passHref>
            <a className="font-medium text-tertiary dark:text-white hover:text-tertiary dark:hover:text-tertiary">
              cadastre-se
            </a>
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-800  py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-200"
              >
                E-mail
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 bg-slate-900 border border-slate-900 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-200"
              >
                Senha
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block bg-slate-900 border border-slate-900 w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-slate-100"
                >
                  Lembre-se de mim
                </label>
              </div>

              <div className="text-sm">
                <Link href="/esqueci-a-senha" passHref>
                  <a className="font-medium text-slate-200">
                    Esqueceu sua senha?
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <button type="submit" className="btn-primary w-full">
                Entrar
              </button>
            </div>
          </form>

          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Ou entre com sua rede social
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Entrar com Facebook</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Entrar com Twitter</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Entrar com GitHub</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div> */}
        </div>
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
