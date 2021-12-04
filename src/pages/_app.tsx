import '@styles/globals.css'
import 'focus-visible'
import NProgress from 'nprogress'
import Router from 'next/router'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useMount } from 'react-use'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useMount(() => {
    document.body.classList.remove('loading')
  })

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
