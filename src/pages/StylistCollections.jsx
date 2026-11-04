// Maršrutas: /stilisto-pasiulymai
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Garment from '../components/Garment.jsx';
import RequestView from '../components/RequestView.jsx';
import { useAccount } from '../context/AccountContext.jsx';
import { getProduct, getCategory, RENTAL_PERIODS, rentalPrice, formatPrice } from '../data/products.js';

const fmt = (iso) => new Date(iso).toLocaleDateString('lt-LT');

function Collection({ c, request }) {
    const { orderCollection } = useAccount();
    const [days, setDays] = useState(RENTAL_PERIODS[0].days);
    const [showReq, setShowReq] = useState(false);
    const [justOrdered, setJustOrdered] = useState(false);

    const lines = c.items.map((i) => ({ ...i, product: getProduct(i.productId) })).filter((i) => i.product);
    const total = lines.reduce((s, i) => s + rentalPrice(i.product, days), 0);
    const ordered = c.status === 'ordered';

    return (
        <article className="coll">
            <header className="coll-head">
                <div>
                    <h2>{c.title}</h2>
                    <p className="muted">Stilistas atsakė {fmt(c.createdAt)}</p>
                </div>
                {!ordered && <span className="badge">Naujas</span>}
                {ordered && <span className="badge badge-ok">Užsakyta</span>}
            </header>

            {c.note && <p className="coll-note">“{c.note}”</p>}

            <ul className="coll-items">
                {lines.map(({ product, size }) => (
                    <li key={product.id}>
                        <Link to={`/drabuziai/${product.id}`} className="coll-piece">
                            <span className="coll-thumb"><Garment shape={getCategory(product.category).shape} color={product.hex} /></span>
                            <span className="coll-name">{product.name}</span>
                            <span className="muted">Dydis {size} · {formatPrice(rentalPrice(product, days))}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="coll-actions">
                {!ordered ? (
                    <>
                        <label className="coll-days">
                            Nuomos laikotarpis
                            <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
                                {RENTAL_PERIODS.map((p) => <option key={p.days} value={p.days}>{p.days} d.</option>)}
                            </select>
                        </label>
                        <p className="coll-total">Iš viso: <strong>{formatPrice(total)}</strong></p>
                        <button
                            type="button"
                            className="button button-primary"
                            onClick={() => { orderCollection(c.id, days); setJustOrdered(true); }}
                        >
                            Užsakyti rinkinį
                        </button>
                    </>
                ) : (
                    <p role="status" className="notice">
                        {justOrdered ? 'Rinkinys užsakytas. ' : 'Šis rinkinys jau užsakytas. '}
                        <Link to="/profilis">Žiūrėti užsakymų istoriją</Link>
                    </p>
                )}
                {request && (
                    <button type="button" className="button button-ghost" aria-expanded={showReq} onClick={() => setShowReq((v) => !v)}>
                        {showReq ? 'Slėpti užklausą' : 'Peržiūrėti užklausą'}
                    </button>
                )}
            </div>

            {showReq && request && <RequestView request={request} />}
        </article>
    );
}

function PendingRequest({ request }) {
    const [open, setOpen] = useState(false);
    return (
        <article className="coll coll-pending">
            <header className="coll-head">
                <div>
                    <h2>Stilistas dar peržiūri</h2>
                    <p className="muted">Užklausa išsiųsta {fmt(request.createdAt)}. Rinkinį gausi per 24 val.</p>
                </div>
                <span className="badge">Laukiama</span>
            </header>
            <div className="coll-actions">
                <button type="button" className="button button-ghost" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
                    {open ? 'Slėpti užklausą' : 'Peržiūrėti užklausą'}
                </button>
            </div>
            {open && <RequestView request={request} />}
        </article>
    );
}

export default function StylistCollections() {
    const { collections, requests } = useAccount();
    const pending = requests.filter((r) => r.status === 'pending');
    const byId = Object.fromEntries(requests.map((r) => [r.id, r]));

    return (
        <section className="section">
            <div className="container">
                <div className="section-head">
                    <h1>Stilisto pasiūlymai</h1>
                    <Link to="/asm-pasiulymas" className="text-link">Nauja užklausa</Link>
                </div>

                {collections.length === 0 && pending.length === 0 && (
                    <p>Dar neturi pasiūlymų. <Link to="/asm-pasiulymas">Pateik užklausą</Link>, o stilistas sudarys rinkinį.</p>
                )}

                <div className="coll-list">
                    {pending.map((r) => <PendingRequest key={r.id} request={r} />)}
                    {collections.map((c) => <Collection key={c.id} c={c} request={byId[c.requestId]} />)}
                </div>
            </div>
        </section>
    );
}
