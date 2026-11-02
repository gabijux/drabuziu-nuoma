import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container narrow empty">
      <h1>Puslapis nerastas</h1>
      <p>Gal nuoroda pasenusi arba drabužis jau išimtas iš katalogo.</p>
      <Link to="/drabuziai" className="button button-primary">Peržiūrėti drabužius</Link>
    </div>
  );
}
