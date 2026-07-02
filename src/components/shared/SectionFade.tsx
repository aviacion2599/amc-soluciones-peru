/**
 * SectionFade — Separador sutil entre secciones.
 * Dibuja un gradiente de 30px usando el color navy con opacidad muy baja
 * para dar continuidad visual entre bloques.
 */
export function SectionFade() {
  return (
    <div
      className="w-full h-[30px] pointer-events-none select-none"
      aria-hidden="true"
      style={{
        background: "linear-gradient(180deg, rgba(11, 19, 43, 0.06) 0%, transparent 100%)",
      }}
    />
  );
}
