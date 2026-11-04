import Garment from './Garment.jsx';
import Mannequin from './Mannequin.jsx';

const fmt = (iso) => new Date(iso).toLocaleDateString('lt-LT');

// Rodo klientės pateiktą užklausą (nuotraukos, tekstas, sumodeliuotas įvaizdis)
export default function RequestView({ request }) {
    const worn = Object.values(request.outfit ?? {});
    const empty = !request.images.length && !request.text && !worn.length;

    return (
        <div className="req-view">
            <p className="muted">Užklausa išsiųsta {fmt(request.createdAt)}</p>
            {empty && <p>Užklausa be turinio.</p>}

            {request.images.length > 0 && (
                <div>
                    <h4>Nuotraukos</h4>
                    <div className="req-images">
                        {request.images.map((src, i) => <img key={i} src={src} alt={`Tavo nuotrauka ${i + 1}`} />)}
                    </div>
                </div>
            )}

            {request.text && (
                <div>
                    <h4>Aprašymas</h4>
                    <p className="req-text">{request.text}</p>
                </div>
            )}

            {worn.length > 0 && (
                <div>
                    <h4>Sumodeliuotas įvaizdis</h4>
                    <div className="req-outfit">
                        <div className="sr-stage req-stage"><Mannequin outfit={request.outfit} /></div>
                        <ul>
                            {worn.map((p) => (
                                <li key={p.id}>
                                    <span className="sr-mini"><Garment shape={p.shape} color={p.hex} /></span>
                                    {p.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
