import '@styles/globals.css'
import 'focus-visible'
import NProgress from 'nprogress'
import Router from 'next/router'
import type { AppProps } from 'next/app'
import smoothscroll from 'smoothscroll-polyfill'
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SessionProvider } from 'next-auth/react'
import { useMount } from 'react-use'
import { withTRPC } from '@trpc/next'

import type { AppRouter } from '@server/routers/_app'
import { env } from '@config/constants'
import { store } from '@redux/store'
import { transformer } from '@utils/trpc'

import { AuthGuard } from '@components/common/AuthGuard'
import { Layout } from '@components/common/Layout'

export type ExtendedNextPage<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode
  layoutSpacing?: boolean
  requireAuth?: boolean
  requireAdmin?: boolean
}

type ExtendedAppProps<P = Record<string, unknown>> = AppProps<P> & {
  Component: ExtendedNextPage<P>
}

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps }: ExtendedAppProps) => {
  const withLayoutSpacing = Component.layoutSpacing ?? true

  useMount(() => {
    smoothscroll.polyfill()
  })

  const getLayout =
    Component.getLayout ??
    ((page) => (
      <Layout>
        {withLayoutSpacing ? <Layout.Space>{page}</Layout.Space> : page}
      </Layout>
    ))

  useMount(() => {
    document.body.classList.remove('loading')
  })

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          {Component.requireAuth ? (
            <AuthGuard requireAdmin={Component.requireAdmin}>
              {getLayout(<Component {...pageProps} />)}
            </AuthGuard>
          ) : (
            getLayout(<Component {...pageProps} />)
          )}
        </Provider>
      </SessionProvider>

      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  )
}

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */

    /**
     * If public domain, use it.
     * Else check vercel env, if preview, use the vercel deployment URL,
     * otherwise use localhost
     */
    const url = env.vercelPublicDomain
      ? `${env.vercelPublicDomain}/api/trpc`
      : env.vercelEnvPreview
      ? `https://${env.vercelEnvUrl}/api/trpc`
      : 'http://localhost:3000/api/trpc'

    return {
      url,
      transformer,
    }
  },
  ssr: true,
})(App)
