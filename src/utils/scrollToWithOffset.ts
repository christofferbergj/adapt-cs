/**
 * Scroll to an element with top offset
 *
 * @example
 * const element = document.getElementById('my-element')
 *
 * if (element) {
 *   scrollToWithOffset(element, 100)
 * }
 */
export function scrollToWithOffset(
  element: HTMLElement | HTMLDivElement,
  offset = 0,
  scrollToOptions: ScrollToOptions = { behavior: 'smooth' }
): void {
  const bodyRect = document.body.getBoundingClientRect().top
  const elementRect = element.getBoundingClientRect().top
  const elementPosition = elementRect - bodyRect
  const offsetPosition = elementPosition - offset

  window.scrollTo({
    top: offsetPosition,
    ...scrollToOptions,
  })
}
