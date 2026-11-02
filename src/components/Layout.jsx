import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { BRAND } from '../config.js';

export default function Layout() {
  const { items } = useCart();
  const { pathname } = useLocation();

  // Scroll to the top when the page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <path d="M16 13v-3a2.5 2.5 0 1 1 2.5-2.5" />
              <path d="M16 13 L5 24 H27 Z" />
            </svg>
            {BRAND}
          </Link>
          <nav className="main-nav" aria-label="Pagrindinis meniu">
            <NavLink to="/drabuziai">Drabužiai</NavLink>
            <NavLink to="/kaip-tai-veikia">Apie mus</NavLink>
            <NavLink to="/krepselis" className="cart-link">
              Krepšelis
              {items.length > 0 && <span className="cart-count">{items.length}</span>}
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>
            <strong>{BRAND}</strong> – drabužių nuoma vietoj greitosios mados.
          </p>
        </div>
      </footer>
    </div>
  );
}
