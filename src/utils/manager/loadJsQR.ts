export default async function loadJsQR(): Promise<void> {
  const win = window as Window & { jsQR?: unknown }
  if (win.jsQR) return

  const s = document.createElement('script')
  s.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js'
  s.async = true
  document.head.appendChild(s)
  await new Promise<void>((resolve, reject) => {
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('failed to load jsQR script'))
  })
}
