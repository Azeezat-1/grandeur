export const IMG_FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
       <rect width="800" height="1000" fill="#ece7db"/>
       <rect x="0" y="0" width="800" height="1000" fill="none" stroke="#c9bda2"/>
       <text x="400" y="470" font-family="Georgia, serif" font-size="44" letter-spacing="12" fill="#5c4a36" text-anchor="middle">GRANDEUR</text>
       <text x="400" y="530" font-family="Arial, sans-serif" font-size="18" letter-spacing="6" fill="#97763f" text-anchor="middle">MEN&apos;S FASHION</text>
     </svg>`,
  )

export function withFallback(img) {
  const onError = (e) => {
    if (e.currentTarget.src !== IMG_FALLBACK) {
      e.currentTarget.src = IMG_FALLBACK
    }
  }
  return { img, onError }
}