
import Garment from './Garment.jsx';
import { products, getCategory } from '../data/products.js';

const SAMPLE_IDS = ['smaragdo-suknele', 'smelio-svarkas', 'kupranugario-paltas'];

export default function PersonalSetSection() {
    const sample = SAMPLE_IDS.map((id) => products.find((p) => p.id === id)).filter(Boolean);

    return (
        <div className="ps">
            <p className="ps-lead">
                Nežinai, ką rinktis? Parodyk, kas tau patinka, o mūsų stilistas atrinks drabužius tau.
            </p>

            <ol className="ps-flow">
                <li className="ps-step">
                    <h3>Parodyk savo stilių</h3>
                    <div className="ps-bubbles">
                        <span className="ps-bubble ps-b3">
                            <div>Kelk</div>
                            <div>nuotraukas</div>
                        </span>
                        <span className="ps-bubble ps-b3">
                            <div>Aprašyk</div>
                            <div>žodžiais</div>
                        </span>
                        <span className="ps-bubble ps-b3">
                            <div>Derink</div>
                            <div>modeliavimo</div>
                            <div>aplinkoje</div>
                        </span>
                    </div>
                </li>

                <li className="ps-step">
                    <h3>Stilistas peržiūri ir įvertina</h3>


                    <div className="ps-stylist" >
                        <img src="../../public/thinking.png"></img>
                    </div>
                </li>

                <li className="ps-step">
                    <h3>Gauni sudarytą rinkinį</h3>
                    <div className="ps-collection" aria-hidden="true">
                        {sample.map((p) => (
                            <div key={p.id} className="ps-piece">
                                <Garment shape={getCategory(p.category).shape} color={p.hex} />
                            </div>
                        ))}
                    </div>
                </li>

                <li className="ps-step">
                    <h3>Įvertini ir nuomoji, kas patiko</h3>
                    <div className="ps-stylist" >
                        <img src="../../public/like.png"></img>
                    </div>
                </li>
            </ol>
        </div>
    );
}
