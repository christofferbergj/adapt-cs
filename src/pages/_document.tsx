import Document, { Html, Main, NextScript, Head } from 'next/document'
import clsx from 'clsx'

const isDev = process.env.NODE_ENV === 'development'

class MyDocument extends Document {
  render() {
    const bodyClass = clsx('loading dark-theme', { 'debug-screens': isDev })

    return (
      <Html lang="da">
        <Head />

        <body className={bodyClass}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
