export const env = {
  vercelPublicDomain: process.env.NEXT_PUBLIC_DOMAIN,
  vercelEnvPreview: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
  vercelEnvUrl: process.env.NEXT_PUBLIC_VERCEL_URL,
}

/**
 * Amount of fines to show in the fines list
 *
 * The value needs to be synchronised between prefetching calls
 * and calls in the client
 */
export const ITEMS_PER_PAGE = 8
