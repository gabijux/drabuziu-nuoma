import { Link } from 'react-router-dom';
import { RENTAL_PERIODS } from '../data/products.js';

export default function HowItWorks() {
  return (
    <div className="container narrow prose">
      <h1>Kaip veikia nuoma</h1>
      <p className="lead">
        Vienai progai skirtas drabužis spintoje dažnai kabo nenešiotas. Išsinuomojęs jį gauni tik tada, kai jo
        reikia, o po to jį nešioja kitas žmogus.
      </p>

      <ol className="steps steps-vertical">
        <li>
          <h3>Išsirink drabužį</h3>
          <p>Katalogą gali filtruoti pagal kategoriją, dydį, progą ir kainą.</p>
        </li>
        <li>
          <h3>Pasirink laikotarpį</h3>
          <p>Kuo ilgiau nuomojiesi, tuo mažesnė dienos kaina.</p>
        </li>
        <li>
          <h3>Gauk ir nešiok</h3>
          <p>Drabužį atvešime išvalytą į pasirinktą paštomatą.</p>
        </li>
        <li>
          <h3>Grąžink</h3>
          <p>Paskutinę nuomos dieną atiduok drabužį paštomate. Plauti nereikia.</p>
        </li>
      </ol>

      <h2>Nuolaidos ilgesnei nuomai</h2>
      <table className="table">
        <thead>
          <tr><th>Laikotarpis</th><th>Nuolaida</th></tr>
        </thead>
        <tbody>
          {RENTAL_PERIODS.map((p) => (
            <tr key={p.days}>
              <td>{p.days} dienos</td>
              <td>{p.discount ? `${p.discount * 100} %` : 'Bazinė kaina'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Dažni klausimai</h2>
      <details>
        <summary>Kas bus, jei drabužis netiks?</summary>
        <p>Per 24 valandas gali grąžinti drabužį ir pasirinkti kitą dydį be papildomo mokesčio.</p>
      </details>
      <details>
        <summary>O jei drabužį sugadinsiu?</summary>
        <p>Smulkūs nešiojimo pėdsakai įskaičiuoti į kainą. Jei drabužis smarkiai sugadintas, jį pataisysime ir taisymo kainą aptarsime su tavimi.</p>
      </details>
      <details>
        <summary>Ar galiu pratęsti nuomą?</summary>
        <p>Taip, iki nuomos pabaigos gali pratęsti ją dar 4 dienoms.</p>
      </details>

      <Link to="/drabuziai" className="button button-primary">Peržiūrėti drabužius</Link>
    </div>
  );
}
