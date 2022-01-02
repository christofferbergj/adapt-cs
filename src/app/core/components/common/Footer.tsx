import React from 'react'
import { Container } from '@app/core/components/layout/Container'

export const Footer = () => {
  return (
    <Container className="py-6 mt-32 text-center">
      <span className="text-sm text-gray-11">
        <a
          className="transition underline decoration hover:text-purple-11"
          href="https://github.com/christofferberg"
          rel="noreferrer"
          target="_blank"
        >
          Christoffer Berg
        </a>{' '}
        @ Adapt
      </span>
    </Container>
  )
}
