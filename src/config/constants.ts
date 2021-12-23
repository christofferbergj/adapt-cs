export const queryKeys = {
  fineTypes: 'fine-types',
  fines: 'fines',
  ownFines: 'own-fines',
  mostPaidFines: 'most-paid-fines',
  users: 'users',
  leaders: 'leaders',
}

export const env = {
  vercelPublicDomain: process.env.NEXT_PUBLIC_DOMAIN,
  vercelEnvPreview: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
  vercelEnvUrl: process.env.NEXT_PUBLIC_VERCEL_URL,
}

/**
 * Amount of fines to show in the fines list
 *
 * The value needs to be synchronised between the call in statics props
 * and react-query on the client
 */
export const amountOfFines = 8
