/* eslint-disable @typescript-eslint/no-var-requires */
const { withSuperjson } = require('next-superjson')

module.exports = withSuperjson()({
  reactStrictMode: true,
})

/** @type {import('next').NextConfig} */
module.exports = withSuperjson()({
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
})
