/**
 * Format danish currency
 *
 * @param number - The number to format
 *
 * @returns - The number formatted as danish currency
 */
export function formatCurrency(number: number): string {
  const formatter = new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
  })

  return formatter.format(number)
}
