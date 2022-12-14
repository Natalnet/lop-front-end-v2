import React, { useState, useEffect } from 'react'

import { Helmet } from 'react-helmet'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

import Layout from '../components/Layout'
import { SessionProvider } from '../contexts/SessionContext'
import { api } from '../services/api'
import App from '../domain/App'

import '../../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || (page => <Layout>{page}</Layout>)
  const defaultQueryFn = async ({ queryKey }) => {
    const { data } = await api.get(queryKey[0])

    return data
  }
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnReconnect: true,
            refetchOnWindowFocus: false,
            refetchInterval: 0,
            refetchIntervalInBackground: 60000,
            retry: true,
            refetchOnMount: true,
            retryDelay: attempt =>
              Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
            queryFn: defaultQueryFn
          }
        }
      })
  )

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    localStorage.theme = 'dark'
  })

  return (
    <>
      <Helmet titleTemplate="%s | Plataforma LoP" defaultTitle="Plataforma LoP">
        <html lang="en" amp />
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SessionProvider>
            <App>
              <Component {...pageProps} />
            </App>
          </SessionProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
