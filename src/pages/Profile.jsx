
import { Link } from 'react-router-dom';
import { useAccount } from '../context/AccountContext.jsx';
import { getProduct, formatPrice } from '../data/products.js';

const fmt = (iso) => new Date(iso).toLocaleDateString('lt-LT');

export default function Profile() {
    const { user, purchases } = useAccount();
    const initials = user.name.split(' ').map((s) => s[0]).join('').slice(0, 2);

    return (
        <section className="section">
            <div className="container">
                <div className="profile-head">
                    <span className="profile-avatar" aria-hidden="true">{initials}</span>
                    <div>
                        <h1>{user.name}</h1>
                        <p className="muted">{user.email} · {user.city}</p>
                    </div>
                </div>

                <div className="impact" aria-labelledby="impact-title">
                    <h2 id="impact-title">Pasirinkę nuomą vietoje naujo drabužio pirkimo,
                        jau sutaupėte:
                    </h2>
                    <ul className="impact-stats">
                        <li>
                            <strong>~100 kg</strong>
                            <span>CO₂ emisijų</span>
                        </li>
                        <li>
                            <strong>~10 000 l</strong>
                            <span>vandens</span>
                        </li>

                    </ul>
                </div>

                <div className="section-head">
                    <h2>Užsakymų istorija</h2>
                    {/* <Link to="/stilisto-pasiulymai" className="text-link">Stilisto pasiūlymai</Link> */}
                </div>

                {purchases.length === 0 ? (
                    <p>Užsakymų dar nėra. <Link to="/drabuziai">Peržiūrėti drabužius</Link></p>
                ) : (
                    <ul className="orders">
                        {purchases.map((o) => (
                            <li key={o.id} className="order">
                                <div className="order-head">
                                    <div>
                                        {/* <strong>{o.title}</strong> */}
                                        <p className="muted">{fmt(o.createdAt)}</p>
                                    </div>
                                    <strong>{formatPrice(o.total)}</strong>
                                </div>
                                <ul className="order-items">
                                    {o.items.map((i) => {
                                        const p = getProduct(i.productId);
                                        return (
                                            <li key={i.productId}>
                                                <span>{p?.name ?? i.productId}</span>
                                                <span className="muted">Dydis {i.size} · {i.days} d. · {formatPrice(i.price)}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
