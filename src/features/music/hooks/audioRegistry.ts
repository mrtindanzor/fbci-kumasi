export function listenerRegistry() {
  const listeners = new Map<HTMLAudioElement, () => void>()
  const register = (el: HTMLAudioElement, listener: () => void) => {
    el.addEventListener("play", listener)
    listeners.set(el, listener)
  }
  const cleanup = () =>
    [...listeners].forEach(([el, listener]) => {
      el.removeEventListener("play", listener)
    })

  return { register, cleanup }
}
