/**
 * Cuenta ascendente hasta `target` cuando el elemento entra en pantalla.
 *
 * Mantiene el easing del diseño original: ease-out cúbico durante ~1.8s.
 * Respeta `prefers-reduced-motion` mostrando el valor final directamente.
 */
export function useCountUp(target: MaybeRefOrGetter<number>) {
  const element = ref<HTMLElement | null>(null)
  const display = ref('0')

  const format = (value: number) =>
    value >= 1000 ? `${value.toLocaleString('en-US')}+` : value.toLocaleString('en-US')

  const run = () => {
    const end = toValue(target)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      display.value = format(end)
      return
    }

    const duration = 1800
    const startedAt = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      display.value = format(Math.floor(eased * end))

      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }

  onMounted(() => {
    if (element.value) whenVisible(element.value, run)
  })

  return { element, display }
}
