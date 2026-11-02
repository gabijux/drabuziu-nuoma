import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { products, CATEGORIES, OCCASIONS, SIZES } from '../data/products.js';

const MAX_PRICE = Math.max(...products.map((p) => p.pricePerDay));

const SORT_OPTIONS = [
  { value: 'populiarus', label: 'Rekomenduojami' },
  { value: 'pigiausi', label: 'Pigiausi' },
  { value: 'brangiausi', label: 'Brangiausi' },
  { value: 'pavadinimas', label: 'Pagal pavadinimą' },
];

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filters live in the URL, so a filtered list can be shared or bookmarked
  const query = params.get('q') ?? '';
  const categories = params.get('kategorija')?.split(',').filter(Boolean) ?? [];
  const sizes = params.get('dydis')?.split(',').filter(Boolean) ?? [];
  const occasion = params.get('proga') ?? '';
  const maxPrice = Number(params.get('kaina') ?? MAX_PRICE);
  const sort = params.get('rikiuoti') ?? 'populiarus';

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value === '' || value == null || (Array.isArray(value) && value.length === 0)) next.delete(key);
    else next.set(key, Array.isArray(value) ? value.join(',') : value);
    setParams(next, { replace: true });
  };

  const toggle = (list, value) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = products.filter((p) => {
      if (q && !`${p.name} ${p.color} ${p.material}`.toLowerCase().includes(q)) return false;
      if (categories.length && !categories.includes(p.category)) return false;
      if (sizes.length && !sizes.some((s) => p.sizes.includes(s))) return false;
      if (occasion && p.occasion !== occasion) return false;
      if (p.pricePerDay > maxPrice) return false;
      return true;
    });
    const sorted = [...filtered];
    if (sort === 'pigiausi') sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sort === 'brangiausi') sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
    if (sort === 'pavadinimas') sorted.sort((a, b) => a.name.localeCompare(b.name, 'lt'));
    return sorted;
  }, [query, categories.join(), sizes.join(), occasion, maxPrice, sort]);

  const activeFilterCount = categories.length + sizes.length + (occasion ? 1 : 0) + (maxPrice < MAX_PRICE ? 1 : 0);

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });

  return (
    <div className="container catalog">
      <div className="catalog-head">
        <h1>Drabužiai nuomai</h1>
        <div className="catalog-toolbar">
          <label className="search">
            <span className="visually-hidden">Ieškoti</span>
            <input
              type="search"
              placeholder="Ieškok, pvz., linas ar suknelė"
              value={query}
              onChange={(e) => update('q', e.target.value)}
            />
          </label>
          <label className="sort">
            <span className="visually-hidden">Rikiuoti</span>
            <select value={sort} onChange={(e) => update('rikiuoti', e.target.value === 'populiarus' ? '' : e.target.value)}>
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
          <button type="button" className="button button-ghost filters-toggle" onClick={() => setFiltersOpen((v) => !v)} aria-expanded={filtersOpen}>
            Filtrai{activeFilterCount > 0 && ` (${activeFilterCount})`}
          </button>
        </div>
      </div>

      <div className="catalog-body">
        <aside className={`filters ${filtersOpen ? 'is-open' : ''}`} aria-label="Filtrai">
          <fieldset>
            <legend>Kategorija</legend>
            {CATEGORIES.map((c) => (
              <label key={c.id} className="check">
                <input type="checkbox" checked={categories.includes(c.id)} onChange={() => update('kategorija', toggle(categories, c.id))} />
                {c.label}
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>Dydis</legend>
            <div className="chips">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`chip ${sizes.includes(s) ? 'is-active' : ''}`}
                  aria-pressed={sizes.includes(s)}
                  onClick={() => update('dydis', toggle(sizes, s))}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Proga</legend>
            <label className="check">
              <input type="radio" name="proga" checked={!occasion} onChange={() => update('proga', '')} />
              Visos
            </label>
            {OCCASIONS.map((o) => (
              <label key={o} className="check">
                <input type="radio" name="proga" checked={occasion === o} onChange={() => update('proga', o)} />
                {o}
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>Kaina per dieną</legend>
            <input
              type="range"
              min="2"
              max={MAX_PRICE}
              step="1"
              value={maxPrice}
              onChange={(e) => update('kaina', Number(e.target.value) === MAX_PRICE ? '' : e.target.value)}
            />
            <p className="muted">iki {maxPrice} €</p>
          </fieldset>

          {activeFilterCount > 0 && (
            <button type="button" className="text-link" onClick={clearAll}>Išvalyti filtrus</button>
          )}
        </aside>

        <section className="results" aria-live="polite">
          <p className="muted results-count">Rasta drabužių: {results.length}</p>
          {results.length > 0 ? (
            <div className="product-grid">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>Pagal šiuos filtrus nieko neradome</h2>
              <p>Pabandyk kitą dydį ar kategoriją arba pradėk iš naujo.</p>
              <button type="button" className="button button-primary" onClick={clearAll}>Išvalyti filtrus</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
