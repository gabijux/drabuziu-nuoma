// Simple flat garment illustrations used instead of product photos in the prototype.
export const SHAPES = {
  dress: 'M40 22 L60 22 L63 40 L58 50 L80 124 L20 124 L42 50 L37 40 Z',
  top: 'M36 22 L44 20 Q50 28 56 20 L64 22 L86 42 L77 52 L68 45 L68 112 L32 112 L32 45 L23 52 L14 42 Z',
  jacket: 'M34 22 L44 20 L50 40 L56 20 L66 22 L82 38 L86 102 L76 102 L72 56 L72 114 L28 114 L28 56 L24 102 L14 102 L18 38 Z',
  coat: 'M34 22 L44 20 L50 40 L56 20 L66 22 L82 38 L86 106 L76 106 L73 58 L76 126 L24 126 L27 58 L24 106 L14 106 L18 38 Z',
  pants: 'M30 24 L70 24 L76 126 L56 126 L50 62 L44 126 L24 126 Z',
};

export const LAPELS = 'M44 20 L50 62 L56 20';

export default function Garment({ shape = 'top', color = '#999', className = '', label }) {
  const hasLapels = shape === 'jacket' || shape === 'coat';
  return (
    <svg
      className={`garment ${className}`}
      viewBox="0 0 100 130"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {/* hanger */}
      <path d="M50 16 v-5 a5 5 0 1 1 5 -5" className="garment-hanger" />
      <path d={shape === 'pants' ? 'M50 16 L24 24 H76 Z' : 'M50 16 L20 26 H80 Z'} className="garment-hanger" />
      <path d={SHAPES[shape] ?? SHAPES.top} fill={color} className="garment-body" />
      {hasLapels && <path d={LAPELS} className="garment-detail" />}
    </svg>
  );
}
