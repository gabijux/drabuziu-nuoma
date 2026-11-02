import { useState } from 'react';
import { Link } from 'react-router-dom';
import Garment from '../components/Garment.jsx';
import { useCart } from '../context/CartContext.jsx';
import { getProduct, getCategory, formatPrice } from '../data/products.js';

const DELIVERY = 2.99;

export default function Cart() {
  const { items, removeItem, clearCart } = useCart();
  const [ordered, setOrdered] = useState(false);

  if (ordered) {
    return (
      <div className="container narrow empty">
        <h1>Užsakymas pateiktas</h1>
        <p>Patvirtinimą gausi el. paštu.</p>
        <Link to="/drabuziai" className="button button-primary">Grįžti į katalogą</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container narrow empty">
        <h1>Krepšelis tuščias</h1>
        <p>Išsirink drabužį, pasirink dydį ir nuomos laikotarpį.</p>
        <Link to="/drabuziai" className="button button-primary">Peržiūrėti drabužius</Link>
      </div>
    );
  }

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  const handleOrder = () => {
    clearCart();
    setOrdered(true);
  };

  return (
    <div className="container cart">
      <h1>Krepšelis</h1>
      <div className="cart-body">
        <ul className="cart-list">
          {items.map((item) => {
            const product = getProduct(item.productId);
            const category = getCategory(product.category);
            return (
              <li key={item.key} className="cart-line">
                <div className="cart-thumb">
                  <Garment shape={category.shape} color={product.hex} />
                </div>
                <div className="cart-line-info">
                  <Link to={`/drabuziai/${product.id}`}><strong>{product.name}</strong></Link>
                  <p className="muted">Dydis {item.size} · {item.days} d. nuoma</p>
                  <button type="button" className="text-link" onClick={() => removeItem(item.key)}>Pašalinti</button>
                </div>
                <p className="cart-line-price">{formatPrice(item.price)}</p>
              </li>
            );
          })}
        </ul>

        <aside className="summary">
          <h2>Suma</h2>
          <dl>
            <div><dt>Nuoma</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div><dt>Valymas</dt><dd>Įskaičiuotas</dd></div>
            <div><dt>Pristatymas į paštomatą</dt><dd>{formatPrice(DELIVERY)}</dd></div>
            <div className="summary-total"><dt>Iš viso</dt><dd>{formatPrice(subtotal + DELIVERY)}</dd></div>
          </dl>
          <button type="button" className="button button-primary button-block" onClick={handleOrder}>
            Pateikti užsakymą
          </button>
        </aside>
      </div>
    </div>
  );
}
