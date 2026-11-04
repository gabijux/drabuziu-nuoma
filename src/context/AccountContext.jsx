// context/AccountContext.jsx
// Prototipo "backend" atmintyje (po perkrovimo duomenys grįžta į pradinius).
// Apgaubk programą: <CartProvider><AccountProvider> ... </AccountProvider></CartProvider>
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { getProduct, getCategory, rentalPrice } from '../data/products.js';
import { SLOT_OF_SHAPE } from '../components/Mannequin.jsx';

const AccountContext = createContext(null);
export const useAccount = () => useContext(AccountContext);

const DEMO_USER = { name: 'Vardenis Pavardenis', email: 'vardenis@pavyzdys.lt', city: 'Kaunas' };
const today = () => new Date().toISOString();
const swatch = (c) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="120" height="120" fill="${c}"/></svg>`)}`;

// Produktas su forma
const pick = (id) => {
    const p = getProduct(id);
    return p ? { ...p, shape: getCategory(p.category).shape } : null;
};
const outfitOf = (ids) => {
    const o = {};
    ids.map(pick).filter(Boolean).forEach((p) => { o[SLOT_OF_SHAPE[p.shape] ?? 'top'] = p; });
    return o;
};
const collectionItems = (ids) =>
    ids.map(getProduct).filter(Boolean).map((p) => ({ productId: p.id, size: p.sizes?.[0] ?? 'M' }));
const line = (it, days) => {
    const p = getProduct(it.productId);
    return { productId: it.productId, size: it.size, days, price: rentalPrice(p, days) };
};

function seed() {
    const request = {
        id: 'r1',
        createdAt: '2026-10-12T10:00:00.000Z',
        status: 'answered',
        text: 'Vestuvės lapkritį, patinka žalia ir minimalizmas. Nenoriu aptemptų siluetų.',
        images: [swatch('#2f6b57'), swatch('#d8c9b0')],
        outfit: outfitOf(['smaragdo-suknele']),
    };
    const collection = {
        id: 'c1',
        requestId: 'r1',
        createdAt: '2026-10-13T09:00:00.000Z',
        title: 'Vestuvių svečio rinkinys',
        note: 'Prie jūsų mėgstamos žalios spalvos, pridėjau neutralų paltą, kad suknelė derėtų prie lapkričio orų.',
        items: collectionItems(['smaragdo-suknele', 'kupranugario-paltas']),
        status: 'new',
    };
    const old = collectionItems(['balti-marskiniai', 'smelio-svarkas']).map((i) => line(i, 4));
    const purchase = {
        id: 'p1',
        createdAt: '2026-09-02T12:00:00.000Z',
        title: 'Darbo interviu',
        items: old,
        total: old.reduce((s, i) => s + i.price, 0),
    };
    return { requests: [request], collections: [collection], purchases: [purchase] };
}

export function AccountProvider({ children }) {
    const [state, setState] = useState(seed);

    // Nauja užklausa; po kelių sekundžių "stilistas" demonstracijai atsako.
    const submitRequest = useCallback(({ images, text, outfit }) => {
        const id = `r${Date.now()}`;
        const request = { id, createdAt: today(), status: 'pending', text: text.trim(), images: images.map((i) => i.url), outfit };
        setState((s) => ({ ...s, requests: [request, ...s.requests] }));

        setTimeout(() => {
            setState((s) => ({
                ...s,
                requests: s.requests.map((r) => (r.id === id ? { ...r, status: 'answered' } : r)),
                collections: [
                    {
                        id: `c${Date.now()}`,
                        requestId: id,
                        createdAt: today(),
                        title: 'Tavo asmeninis rinkinys',
                        note: 'Peržiūrėjau tavo užklausą ir sudėliojau rinkinį, kuris atitinka tavo pageidavimus.',
                        items: collectionItems(['tamsiai-melynas-kostiumas', 'silkine-palaidine', 'bordo-vakarine']),
                        status: 'new',
                    },
                    ...s.collections,
                ],
            }));
        }, 6000); // DEMO: pašalink, kai bus tikras stilistas
        return id;
    }, []);

    const orderCollection = useCallback((collectionId, days) => {
        setState((s) => {
            const c = s.collections.find((x) => x.id === collectionId);
            if (!c || c.status === 'ordered') return s;
            const items = c.items.map((i) => line(i, days));
            const purchase = {
                id: `p${Date.now()}`,
                createdAt: today(),
                title: c.title,
                items,
                total: items.reduce((sum, i) => sum + i.price, 0),
            };
            return {
                ...s,
                purchases: [purchase, ...s.purchases],
                collections: s.collections.map((x) => (x.id === collectionId ? { ...x, status: 'ordered' } : x)),
            };
        });
    }, []);

    const value = useMemo(
        () => ({
            user: DEMO_USER,
            ...state,
            newCount: state.collections.filter((c) => c.status === 'new').length,
            submitRequest,
            orderCollection,
        }),
        [state, submitRequest, orderCollection],
    );
    return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}
