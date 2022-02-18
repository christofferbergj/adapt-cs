import { Container } from '@app/core/components/layout/Container'

export const Footer = () => {
  return (
    <Container className="mt-32 flex flex-col gap-2 py-6 text-center text-xs text-gray-11">
      <span>
        <a
          className="decoration underline transition hover:text-purple-11"
          href="https://github.com/christofferberg"
          rel="noreferrer"
          target="_blank"
        >
          Christoffer Berg
        </a>{' '}
      </span>

      <span>
        <a
          className="decoration underline transition hover:text-purple-11"
          href="https://github.com/casperengl"
          rel="noreferrer"
          target="_blank"
        >
          Casper Engelmann
        </a>{' '}
      </span>
    </Container>
  )
}
