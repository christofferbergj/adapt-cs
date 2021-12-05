import '@styles/globals.css'
import 'focus-visible'
import NProgress from 'nprogress'
import Router from 'next/router'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SessionProvider } from 'next-auth/react'
import { useMount } from 'react-use'
import { useState } from 'react'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  useMount(() => {
    document.body.classList.remove('loading')
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Hydrate>

      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  )
}
