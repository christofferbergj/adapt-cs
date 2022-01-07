/**
 * Utility for handling errors thrown in `catch` clauses
 *
 * @param error - The error thrown by a catch
 *
 * @see https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
 */
export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message

  return String(error)
}

export function isError(error: unknown) {
  return error instanceof Error
}
