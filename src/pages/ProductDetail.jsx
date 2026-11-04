import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Garment from '../components/Garment.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx';
import { products, getProduct, getCategory, RENTAL_PERIODS, SIZES, rentalPrice, formatPrice } from '../data/products.js';
import { getImpact } from '../data/impact.js';
import NotFound from './NotFound.jsx';

const MIN_DAYS = 1;
const MAX_DAYS = 365;

const toISO = (d) => {
  const x = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return x.toISOString().slice(0, 10);
};
const addDays = (iso, n) => {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + n);
  return toISO(d);
};
const diffDays = (from, to) =>
  Math.round((new Date(`${to}T00:00:00`) - new Date(`${from}T00:00:00`)) / 86400000) + 1; // imtinai

// Kainos skaiciavimas pasirinktam laikotarpiui: taikoma didziausia nuolaida is RENTAL_PERIODS, kurios days <= pasirinktu dienu
function customPrice(product, days) {
  const tier = [...RENTAL_PERIODS].filter((p) => p.days <= days).sort((a, b) => b.days - a.days)[0];
  const discount = tier?.discount ?? 0;
  return Math.round(product.pricePerDay * days * (1 - discount) * 100) / 100;
}

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProduct(id);
  const { addItem } = useCart();
  const [size, setSize] = useState('');
  const [period, setPeriod] = useState(RENTAL_PERIODS[0].days); // skaicius arba 'custom'
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [added, setAdded] = useState(false);

  const today = useMemo(() => toISO(new Date()), []);
  const isCustom = period === 'custom';
  const customDays = from && to ? diffDays(from, to) : 0;
  const customError =
    isCustom && from && to
      ? customDays < MIN_DAYS
        ? `Mažiausias nuomos laikotarpis – ${MIN_DAYS} d.`
        : customDays > MAX_DAYS
          ? `Didžiausias nuomos laikotarpis – ${MAX_DAYS} d.`
          : ''
      : '';
  const customValid = isCustom && customDays >= MIN_DAYS && customDays <= MAX_DAYS;

  if (!product) return <NotFound />;

  const category = getCategory(product.category);
  const days = isCustom ? customDays : period;
  const total = isCustom ? (customValid ? customPrice(product, customDays) : 0) : rentalPrice(product, period);
  const canAdd = !!size && (!isCustom || customValid);
  const impact = getImpact(category.shape, product.value, total);
  const similar = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAdd = () => {
    addItem({
      productId: product.id,
      size,
      days,
      price: total,
      ...(isCustom ? { from, to } : {}),
    });
    setAdded(true);
  };

  const pick = (value) => { setPeriod(value); setAdded(false); };
  const onFrom = (v) => {
    setFrom(v);
    // jei "iki" jau neatitinka, išvalome
    if (to && (diffDays(v, to) < 1)) setTo('');
    setAdded(false);
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
                  className={`period ${period === p.days ? 'is-active' : ''}`}
                  aria-pressed={period === p.days}
                  onClick={() => pick(p.days)}
                >
                  <strong>{p.days} d.</strong>
                  <span>{formatPrice(rentalPrice(product, p.days))}</span>
                  {p.discount > 0 && <span className="period-save">−{p.discount * 100} %</span>}
                </button>
              ))}
              <button
                type="button"
                className={`period ${isCustom ? 'is-active' : ''}`}
                aria-pressed={isCustom}
                onClick={() => pick('custom')}
              >
                <strong>Pasirinktas intervalas</strong>
                <span>{customValid ? formatPrice(total) : 'Pasirinkite datas'}</span>
              </button>
            </div>

            {isCustom && (
              <div className="date-range">
                <label>
                  Nuo
                  <input type="date" value={from} min={today} onChange={(e) => onFrom(e.target.value)} />
                </label>
                <label>
                  Iki
                  <input
                    type="date"
                    value={to}
                    min={from ? addDays(from, MIN_DAYS - 1) : today}
                    max={from ? addDays(from, MAX_DAYS - 1) : undefined}
                    disabled={!from}
                    onChange={(e) => { setTo(e.target.value); setAdded(false); }}
                  />
                </label>
                <p className={`date-hint ${customError ? 'is-error' : 'muted'}`} role={customError ? 'alert' : undefined}>
                  {customError ||
                    (customValid
                      ? `${customDays} d. nuomos laikotarpis`
                      : `Nuo ${MIN_DAYS} iki ${MAX_DAYS} dienų.`)}
                </p>
              </div>
            )}
          </fieldset>

          <div className="impact" aria-labelledby="impact-title">
            <h2 id="impact-title">Pasirinkdami nuomotis šį drabužį, o ne pirkti naują,
              sutaupote:
            </h2>
            <ul className="impact-stats">
              <li>
                <strong>~{impact.co2} kg</strong>
                <span>CO₂ emisijų</span>
              </li>
              <li>
                <strong>~{impact.water.toLocaleString('lt-LT')} l</strong>
                <span>vandens</span>
              </li>

            </ul>
            <p className="impact-note muted">
              Apytikslis vienos naujos panašios prekės pagaminimo poveikis.
            </p>
          </div>

          <div className="product-cta">
            <p className="product-total">
              Iš viso: <strong>{total ? formatPrice(total) : '–'}</strong>
            </p>
            <button type="button" className="button button-primary" disabled={!canAdd} onClick={handleAdd}>
              Pridėti į krepšelį
            </button>
            {!size && <p className="muted">Pirmiausia pasirink dydį.</p>}
            {size && isCustom && !customValid && <p className="muted">Pasirink nuomos datas.</p>}
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
