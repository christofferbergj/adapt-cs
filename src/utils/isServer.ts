/**
 * Check if on the server or client
 */
export function isServer() {
  return !(typeof window != 'undefined' && window.document)
}
