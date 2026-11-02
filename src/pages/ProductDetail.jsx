import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Garment from '../components/Garment.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx';
import { products, getProduct, getCategory, RENTAL_PERIODS, SIZES, rentalPrice, formatPrice } from '../data/products.js';
import NotFound from './NotFound.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProduct(id);
  const { addItem } = useCart();
  const [size, setSize] = useState('');
  const [days, setDays] = useState(RENTAL_PERIODS[0].days);
  const [added, setAdded] = useState(false);

  if (!product) return <NotFound />;

  const category = getCategory(product.category);
  const total = rentalPrice(product, days);
  const similar = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAdd = () => {
    addItem({ productId: product.id, size, days, price: total });
    setAdded(true);
  };

  return (
    <div className="container">
      <nav className="breadcrumbs" aria-label="Kelias">
        <Link to="/drabuziai">Drabužiai</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/drabuziai?kategorija=${category.id}`}>{category.label}</Link>
      </nav>

      <div className="product">
        <div className="product-image">
          <Garment shape={category.shape} color={product.hex} label={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-price">
            {formatPrice(product.pricePerDay)} <span className="muted">per dieną</span>
          </p>
          <p>{product.description}</p>

          <dl className="specs">
            <div><dt>Spalva</dt><dd>{product.color}</dd></div>
            <div><dt>Medžiaga</dt><dd>{product.material}</dd></div>
            <div><dt>Proga</dt><dd>{product.occasion}</dd></div>
            <div><dt>Parduotuvėje kainuotų apie</dt><dd>{formatPrice(product.value)}</dd></div>
          </dl>

          <fieldset className="option-group">
            <legend>Dydis</legend>
            <div className="chips">
              {SIZES.map((s) => {
                const available = product.sizes.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    className={`chip ${size === s ? 'is-active' : ''}`}
                    aria-pressed={size === s}
                    disabled={!available}
                    onClick={() => { setSize(s); setAdded(false); }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="option-group">
            <legend>Nuomos laikotarpis</legend>
            <div className="periods">
              {RENTAL_PERIODS.map((p) => (
                <button
                  key={p.days}
                  type="button"
                  className={`period ${days === p.days ? 'is-active' : ''}`}
                  aria-pressed={days === p.days}
                  onClick={() => { setDays(p.days); setAdded(false); }}
                >
                  <strong>{p.days} d.</strong>
                  <span>{formatPrice(rentalPrice(product, p.days))}</span>
                  {p.discount > 0 && <span className="period-save">−{p.discount * 100} %</span>}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="product-cta">
            <p className="product-total">
              Iš viso: <strong>{formatPrice(total)}</strong>
            </p>
            <button type="button" className="button button-primary" disabled={!size} onClick={handleAdd}>
              Pridėti į krepšelį
            </button>
            {!size && <p className="muted">Pirmiausia pasirink dydį.</p>}
            {added && (
              <p className="notice" role="status">
                Pridėta į krepšelį. <Link to="/krepselis">Peržiūrėti krepšelį</Link>
              </p>
            )}
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="section">
          <h2>Panašūs drabužiai</h2>
          <div className="product-grid">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
