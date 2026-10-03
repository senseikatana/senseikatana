/**
 * Registro compartido de visibilidad por scroll.
 *
 * Tanto las transiciones de entrada (`.reveal`, `.reveal-stagger`,
 * `.headline-line`, que alternan la clase `in-view`) como los contadores
 * numéricos necesitan "disparar una vez cuando el elemento entra en pantalla".
 * Ambos pasan por este módulo para que la página mantenga un único observer en
 * lugar de uno por instancia de componente.
 *
 * Se inicializa de forma perezosa porque `IntersectionObserver` no existe en SSR.
 */
type VisibleCallback = () => void

interface Subscription {
  callback?: VisibleCallback
}

const subscriptions = new WeakMap<Element, Subscription>()
let observer: IntersectionObserver | null = null

function ensureObserver(): IntersectionObserver | null {
  if (import.meta.server) return null
  if (observer) return observer

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue

        const subscription = subscriptions.get(entry.target)
        subscription?.callback?.()

        // El estilo de entrada es CSS puro, disparado por esta clase.
        if (subscription && subscription.callback === undefined) {
          entry.target.classList.add('in-view')
        }

        observer!.unobserve(entry.target)
        subscriptions.delete(entry.target)
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
  )

  return observer
}

function track(element: Element, callback?: VisibleCallback): void {
  if (subscriptions.has(element)) return

  subscriptions.set(element, callback ? { callback } : {})
  ensureObserver()?.observe(element)
}

/** Añade `in-view` a `element` la primera vez que se vuelve visible. */
export function onReveal(element: Element): void {
  track(element)
}

/** Ejecuta `callback` una única vez, cuando `element` se vuelve visible. */
export function whenVisible(element: Element, callback: VisibleCallback): void {
  track(element, callback)
}

/** Recorre el DOM — se usa al montar para detectar contenido de servidor. */
export function revealAll(scope: ParentNode = document): void {
  for (const element of scope.querySelectorAll('.reveal, .reveal-stagger, .headline-line')) {
    track(element)
  }
}
