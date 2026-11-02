import { Link } from 'react-router-dom';
import Garment from '../components/Garment.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { products, getCategory, OCCASIONS } from '../data/products.js';

const RAIL_IDS = ['smaragdo-suknele', 'smelio-svarkas', 'balti-marskiniai', 'kupranugario-paltas', 'bordo-vakarine', 'tamsiai-melynas-kostiumas'];
const FEATURED_IDS = ['smaragdo-suknele', 'tamsiai-melynas-kostiumas', 'silkine-palaidine', 'kupranugario-paltas'];

export default function Home() {
  const railItems = RAIL_IDS.map((id) => products.find((p) => p.id === id));
  const featured = FEATURED_IDS.map((id) => products.find((p) => p.id === id));

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <h1>Išsinuomok - nepirk naujo</h1>
            <div className="hero-actions">
              <Link to="/drabuziai" className="button button-primary">Peržiūrėti drabužius</Link>
              <Link to="/kaip-tai-veikia" className="button button-ghost">Apie mus</Link>
            </div>
          </div>
        </div>
        <div className="rail" aria-hidden="true">
          <div className="rail-bar" />
          <div className="rail-items">
            {railItems.map((p) => (
              <Link key={p.id} to={`/drabuziai/${p.id}`} className="rail-item" tabIndex={-1}>
                <Garment shape={getCategory(p.category).shape} color={p.hex} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Trys žingsniai</h2>
          <ol className="steps">
            <li>
              <h3>Išsirink</h3>
              <p>Ieškok pagal progą, dydį ar kainą ir pasirink nuomos laikotarpį.</p>
            </li>
            <li>
              <h3>Nešiok</h3>
              <p>Drabužį gausi išvalytą. Nešiok nuo 4 iki 14 dienų.</p>
            </li>
            <li>
              <h3>Grąžink</h3>
              <p>Atiduok paštomate. Valymas jau įskaičiuotas į kainą.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section section-tinted">
        <div className="container">
          <div className="section-head">
            <h2>Populiariausi</h2>
            <Link to="/drabuziai" className="text-link">Visi drabužiai</Link>
          </div>
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Kokiai progai?</h2>
          <div className="occasion-list">
            {OCCASIONS.map((o) => (
              <Link key={o} to={`/drabuziai?proga=${encodeURIComponent(o)}`} className="occasion">
                {o}
                <span className="muted">{products.filter((p) => p.occasion === o).length} drabužiai</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
