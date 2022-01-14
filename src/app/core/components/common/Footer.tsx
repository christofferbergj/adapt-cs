import { Container } from '@app/core/components/layout/Container'

export const Footer = () => {
  return (
    <Container className="flex flex-col gap-2 py-6 mt-32 text-xs text-center text-gray-11">
      <span>
        <a
          className="underline transition decoration hover:text-purple-11"
          href="https://github.com/christofferberg"
          rel="noreferrer"
          target="_blank"
        >
          Christoffer Berg
        </a>{' '}
      </span>

      <span>
        <a
          className="underline transition decoration hover:text-purple-11"
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
