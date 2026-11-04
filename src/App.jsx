import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import NotFound from './pages/NotFound.jsx';
import StylistRequest from './pages/StylistRequest.jsx';
import Profile from './pages/Profile.jsx';
import StylistCollections from './pages/StylistCollections.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/drabuziai" element={<Catalog />} />
        <Route path="/drabuziai/:id" element={<ProductDetail />} />
        <Route path="/krepselis" element={<Cart />} />
        <Route path="/kaip-tai-veikia" element={<HowItWorks />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/asm-pasiulymas" element={<StylistRequest />} />
        <Route path="profilis" element={<Profile />} />
        <Route path="stilisto-pasiulymai" element={<StylistCollections />} />
      </Route>
    </Routes>
  );
}
