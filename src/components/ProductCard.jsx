import { Link } from 'react-router-dom';
import Garment from './Garment.jsx';
import { getCategory, formatPrice } from '../data/products.js';

export default function ProductCard({ product }) {
  const category = getCategory(product.category);
  return (
    <Link to={`/drabuziai/${product.id}`} className="product-card">
      <div className="product-card-image">
        <Garment shape={category.shape} color={product.hex} />
      </div>
      <div className="product-card-body">
        <h3>{product.name}</h3>
        <p className="product-card-meta">
          {category.label} · {product.sizes.join(', ')}
        </p>
        <p className="product-card-price">
          nuo <strong>{formatPrice(product.pricePerDay)}</strong> / d.
        </p>
      </div>
    </Link>
  );
}
