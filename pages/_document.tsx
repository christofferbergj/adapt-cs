import clsx from 'clsx'
import Document, { Head, Html, Main, NextScript } from 'next/document'

const isDev = process.env.NODE_ENV === 'development'

class MyDocument extends Document {
  render() {
    const bodyClass = clsx('loading', { 'debug-screens': isDev })

    return (
      <Html lang="da">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>

        <body className={bodyClass}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
