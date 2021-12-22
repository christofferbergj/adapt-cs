import '@styles/globals.css'
import 'focus-visible'
import NProgress from 'nprogress'
import Router from 'next/router'
import type { AppProps } from 'next/app'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SessionProvider } from 'next-auth/react'
import { useMount } from 'react-use'
import { withTRPC } from '@trpc/next'

import type { AppRouter } from '@server/routers/_app'
import { transformer } from '@utils/trpc'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps }: AppProps) => {
  useMount(() => {
    document.body.classList.remove('loading')
  })

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
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
    const url =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/trpc'
        : 'https://adapt-cs.vercel.app/api/trpc'

    return {
      url,
      transformer,
    }
  },
  ssr: true,
})(App)
