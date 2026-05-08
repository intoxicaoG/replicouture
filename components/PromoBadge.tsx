// ╔══════════════════════════════════════════════════════════════╗
// ║  PROMO BADGE — fácil de editar o eliminar                   ║
// ║                                                              ║
// ║  Para DESACTIVAR: cambia enabled: false                      ║
// ║  Para EDITAR:     modifica PROMO_CONFIG abajo                ║
// ║  Para ELIMINAR:   borra este archivo y quita <PromoBadge />  ║
// ║                   de page.tsx (1 sola línea)                 ║
// ╚══════════════════════════════════════════════════════════════╝

// ─── CONFIGURACIÓN ────────────────────────────────────────────────────────────
export const PROMO_CONFIG = {
  enabled: true,                    // false = oculta el badge sin tocar nada más

  headline: "2ª unidad",           // texto superior
  discount: "−50%",                 // número grande central
  subtext: "",  // texto inferior

  // Colores del degradado radial (acepta cualquier valor CSS)
  bgFrom: "#f59e0b",               // ámbar — centro del círculo
  bgTo:   "#ef4444",               // rojo  — borde exterior
  textColor: "#ffffff",
}
// ─────────────────────────────────────────────────────────────────────────────

export function PromoBadge() {
  if (!PROMO_CONFIG.enabled) return null

  const { headline, discount, subtext, bgFrom, bgTo, textColor } = PROMO_CONFIG

  return (
    <div
      aria-label={`Promoción: ${headline} ${discount} ${subtext}`}
      className="
        absolute -top-4 -right-4 z-20
        flex flex-col items-center justify-center
        w-28 h-28 sm:w-32 sm:h-32
        rounded-full
        select-none
      "
      style={{
        background: `radial-gradient(circle at 35% 35%, ${bgFrom}, ${bgTo})`,
        color: textColor,
        boxShadow: `
          0 0 0 3px ${bgTo}44,
          0 0 0 6px ${bgFrom}33,
          0 8px 32px rgba(0,0,0,0.35)
        `,
      }}
    >
      {/* Textura de puntos sutil */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 rounded-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="promo-dots" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#promo-dots)" />
      </svg>

      {/* Brillo superior */}
      <div
        className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-5 rounded-full blur-sm"
        style={{ background: "rgba(255,255,255,0.25)" }}
      />

      {/* Texto */}
      <span className="relative z-10 text-[10px] font-bold uppercase tracking-widest opacity-90 leading-tight">
        {headline}
      </span>
      <span className="relative z-10 text-3xl sm:text-4xl font-black leading-none tracking-tighter mt-0.5">
        {discount}
      </span>
      <span className="relative z-10 text-[9px] font-semibold uppercase tracking-wider opacity-80 leading-tight text-center px-2 mt-0.5">
        {subtext}
      </span>
    </div>
  )
}
