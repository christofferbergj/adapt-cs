export type MatchInput = string | number | symbol
export type Match<T extends MatchInput, U> = Record<T | '_', U>

/**
 * Helper to return value of key,value pair.
 *
 * @param input The input that should be matched.
 * @param map Map of values to return.
 */
export function match<T extends MatchInput, U>(
  input: T | undefined | null,
  map: Match<T, T extends '_' ? U : U>
) {
  return input ? map[input] : map._
}
