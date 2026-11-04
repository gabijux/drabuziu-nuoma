export const IMPACT_BY_SHAPE = {
    top: { co2: 8, water: 2700 },
    dress: { co2: 20, water: 4000 },
    jacket: { co2: 25, water: 5000 },
    coat: { co2: 35, water: 6000 },
    pants: { co2: 33, water: 7500 },
};

export function getImpact(shape, retailValue, rentalTotal) {
    const base = IMPACT_BY_SHAPE[shape] ?? IMPACT_BY_SHAPE.top;
    return {
        co2: base.co2,                                   // kg CO₂e
        water: base.water,                               // litrai
        saved: Math.max(0, (retailValue ?? 0) - (rentalTotal ?? 0)), // eurai
    };
}
