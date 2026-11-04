import { SHAPES, LAPELS } from './Garment.jsx'; // pakeisk kelią pagal savo struktūrą: '../components/Garment.jsx'

// Kiekvienas drabužis piešiamas tiesiai ant lėlės, naudojant tas pačias SVG kontūrų formas kaip Garment (be pakabos).
// s = mastelis, y = kur ant lėlės atsiduria drabužio viršus (kakliukas / juosmuo).
const FIT = {
    top: { s: 1.5, y: 72 },
    dress: { s: 1.8, y: 76 },
    jacket: { s: 1.55, y: 70 },
    coat: { s: 1.7, y: 70 },
    pants: { s: 1.9, y: 180 },
};
// Garment kontūrų viršutinė riba (y) kiekvienai formai
const TOP_Y = { top: 20, dress: 22, jacket: 20, coat: 20, pants: 24 };

// sluoksnių tvarka: apačioje kelnės, viršuje paltas
export const SLOT_ORDER = ['bottom', 'dress', 'top', 'outer'];
export const SLOT_OF_SHAPE = { pants: 'bottom', dress: 'dress', top: 'top', jacket: 'outer', coat: 'outer' };

export default function Mannequin({ outfit }) {
    return (
        <svg viewBox="0 0 200 410" className="sr-mannequin" role="img" aria-label="Lėlė su pasirinktais drabužiais">
            {/* kūnas */}
            <g className="sr-body">
                <circle cx="100" cy="36" r="19" />
                <rect x="93" y="52" width="14" height="24" rx="5" />
                <path d="M70 74 Q100 66 130 74 L124 140 Q120 175 128 215 L72 215 Q80 175 76 140 Z" />
                <line x1="67" y1="84" x2="50" y2="205" className="sr-limb" />
                <line x1="133" y1="84" x2="150" y2="205" className="sr-limb" />
                <path d="M72 212 L99 212 L95 300 L92 388 L77 388 L76 300 Z" />
                <path d="M101 212 L128 212 L124 300 L123 388 L108 388 L105 300 Z" />
            </g>

            {/* drabužiai */}
            {SLOT_ORDER.map((slot) => {
                const p = outfit[slot];
                if (!p) return null;
                const { shape, hex: color } = p;
                const f = FIT[shape] ?? FIT.top;
                const tx = 100 - 50 * f.s;
                const ty = f.y - (TOP_Y[shape] ?? 20) * f.s;
                return (
                    <g key={slot} transform={`translate(${tx} ${ty}) scale(${f.s})`}>
                        <path d={SHAPES[shape] ?? SHAPES.top} fill={color} stroke="rgba(0,0,0,.28)" strokeWidth="0.8" strokeLinejoin="round" />
                        {(shape === 'jacket' || shape === 'coat') && (
                            <path d={LAPELS} fill="none" stroke="rgba(0,0,0,.35)" strokeWidth="0.8" />
                        )}
                    </g>
                );
            })}
        </svg>
    );
}
