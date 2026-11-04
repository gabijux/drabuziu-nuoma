// Marsrutas: <Route path="/asm-pasiulymas" element={<StylistRequest />} />
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Garment from '../components/Garment.jsx';
import Mannequin, { SLOT_OF_SHAPE } from '../components/Mannequin.jsx';
import { useAccount } from '../context/AccountContext.jsx';
import { products, getCategory } from '../data/products.js';


const TABS = [
    { id: 'photos', label: 'Nuotraukos' },
    { id: 'text', label: 'Aprašymas' },
    { id: 'model', label: 'Modeliavimas' },
];



// Papildom kiekviena produkta forma ir spalva, kad nereiketu kaskart kviesti getCategory
const items = products.map((p) => {
    const cat = getCategory(p.category);
    return {
        ...p,
        shape: cat.shape,
        catLabel: cat.name ?? cat.label ?? cat.title ?? p.category, // pritaikyk pagal savo getCategory objekta
    };
});
const CATEGORIES = [...new Map(items.map((p) => [p.category, p.catLabel])).entries()];

export default function StylistRequest() {
    const [tab, setTab] = useState('photos');
    const [images, setImages] = useState([]);
    const [text, setText] = useState('');
    const [outfit, setOutfit] = useState({}); // slot -> product
    const [filter, setFilter] = useState('all');
    const [sent, setSent] = useState(false);
    const tabRefs = useRef({});
    const { submitRequest } = useAccount();


    const addFiles = (e) => {
        const files = Array.from(e.target.files || []);
        setImages((prev) => [
            ...prev,
            ...files.map((f) => ({ id: crypto.randomUUID(), url: URL.createObjectURL(f), name: f.name })),
        ]);
        e.target.value = '';
    };
    const removeImage = (id) => {
        setImages((prev) => {
            const gone = prev.find((i) => i.id === id);
            if (gone) URL.revokeObjectURL(gone.url);
            return prev.filter((i) => i.id !== id);
        });
    };

    const toggle = (p) =>
        setOutfit((prev) => {
            const slot = SLOT_OF_SHAPE[p.shape] ?? 'top';
            const next = { ...prev };
            if (next[slot]?.id === p.id) { delete next[slot]; return next; }

            if (slot === 'dress') { delete next.top; delete next.bottom; }
            if (slot === 'top' || slot === 'bottom') delete next.dress;
            next[slot] = p;
            return next;
        });

    const worn = Object.values(outfit);
    const visible = filter === 'all' ? items : items.filter((p) => p.category === filter);
    const counts = { photos: images.length, text: text.trim() ? 1 : 0, model: worn.length };
    const hasInput = counts.photos + counts.text + counts.model > 0;
    const isOn = (p) => outfit[SLOT_OF_SHAPE[p.shape] ?? 'top']?.id === p.id;

    const onTabKey = (e) => {
        const i = TABS.findIndex((t) => t.id === tab);
        let n = null;
        if (e.key === 'ArrowRight') n = (i + 1) % TABS.length;
        if (e.key === 'ArrowLeft') n = (i - 1 + TABS.length) % TABS.length;
        if (n !== null) { setTab(TABS[n].id); tabRefs.current[TABS[n].id]?.focus(); }
    };

    const summary = useMemo(() => {
        const parts = [];
        if (images.length) parts.push(`${images.length} nuotr.`);
        if (text.trim()) parts.push('aprašymą');
        if (worn.length) parts.push(`${worn.length} drabužius lėlėje`);
        return parts.join(', ');
    }, [images.length, text, worn.length]);

    if (sent) {
        return (
            <section className="section">
                <div className="container sr-done">
                    <h1>Užklausa stilistui išsiųsta</h1>
                    <p> Rinkinys bus paruoštas per 3 d.d.</p>

                    <div className="sr-submit" style={{ justifyContent: 'center' }}>

                        <Link to="/stilisto-pasiulymai" className="button button-primary">Turimi stilisto pasiūlymai</Link>
                        <button className="button button-ghost" onClick={() => setSent(false)}>Redaguoti užklausą</button>
                        <button
                            className="button button-ghost"
                            onClick={() => { setImages([]); setText(''); setOutfit({}); setTab('photos'); setSent(false); }}
                        >
                            Nauja užklausa
                        </button>
                    </div>

                </div>
            </section>
        );
    }

    return (
        <section className="section">
            <div className="container">
                <h1>Asmeninis rinkinys</h1>
                <p className="sr-intro">Savo stilių galite perteikti keliais būdais: įkelkite nuotraukas, kuriose
                    atsipindi jūsų mados stilius ir skonis, arba pateikite žodinį aprašymą, kokie drabužiai jums patinka,
                    arba derinkite aprangas iš esamų pasirinkimų modeliavimo aplinkoje.
                </p>

                <div className="sr-tabs" role="tablist" aria-label="Kaip nori parodyti stilių" onKeyDown={onTabKey}>
                    {TABS.map((t) => (
                        <button
                            key={t.id}
                            ref={(el) => (tabRefs.current[t.id] = el)}
                            role="tab"
                            id={`tab-${t.id}`}
                            aria-selected={tab === t.id}
                            aria-controls={`panel-${t.id}`}
                            tabIndex={tab === t.id ? 0 : -1}
                            className={`sr-tab ${tab === t.id ? 'is-active' : ''}`}
                            onClick={() => setTab(t.id)}
                        >
                            {t.label}
                            {/* {counts[t.id] > 0 && <span className="sr-count">{counts[t.id]}</span>} */}
                        </button>
                    ))}
                </div>

                <div className="sr-panel" role="tabpanel" id="panel-photos" aria-labelledby="tab-photos" hidden={tab !== 'photos'}>
                    <p >Įkelkite nuotraukas, kuriose matomi drabužiai, stilius, įvaizdžiai, kurie patinka jums. </p>
                    <div className="sr-thumbs">
                        {images.map((i) => (
                            <figure key={i.id} className="sr-thumb">
                                <img src={i.url} alt={i.name} />
                                <button type="button" onClick={() => removeImage(i.id)} aria-label={`Pašalinti ${i.name}`}>×</button>
                            </figure>
                        ))}
                        <label className="sr-add">
                            <input type="file" accept="image/*" multiple onChange={addFiles} />
                            <span>+ Pridėti nuotrauką</span>
                        </label>
                    </div>
                </div>

                <div className="sr-panel" role="tabpanel" id="panel-text" aria-labelledby="tab-text" hidden={tab !== 'text'}>
                    <p>Aprašykite savo stilių: kokie drabužiai patinka, ko vengiate, kokios patinka spalvos.
                        Jei ieškote drabužių konkrečiai progai, paminėkite ją. Galite nurodyti ir norimą biudžetą.
                    </p>
                    <textarea
                        rows={8}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Pvz.: mėgstu laisvus, patogius drabužius. Patinka tamsios spalvos"
                    />
                </div>

                <div className="sr-panel" role="tabpanel" id="panel-model" aria-labelledby="tab-model" hidden={tab !== 'model'}>
                    <div className="sr-model-wrap">
                        <div className="sr-stage-col">
                            <div className="sr-stage">
                                <Mannequin outfit={outfit} />
                                {worn.length === 0 && <p className="sr-empty">Spustelkite norimą drabužį iš sąrašo</p>}
                            </div>
                            {worn.length > 0 && (
                                <button type="button" className="text-link sr-clear" onClick={() => setOutfit({})}>Nuimti visus drabužius</button>
                            )}
                        </div>

                        <div>
                            <div className="sr-filters" role="group" aria-label="Drabužių kategorijos">
                                <button type="button" aria-pressed={filter === 'all'} className={filter === 'all' ? 'is-on' : ''} onClick={() => setFilter('all')}>
                                    Visi
                                </button>
                                {CATEGORIES.map(([id, label]) => (
                                    <button key={id} type="button" aria-pressed={filter === id} className={filter === id ? 'is-on' : ''} onClick={() => setFilter(id)}>
                                        {label}
                                    </button>
                                ))}
                            </div>

                            <ul className="sr-picker">
                                {visible.map((p) => (
                                    <li key={p.id}>
                                        <button type="button" className={isOn(p) ? 'is-on' : ''} aria-pressed={isOn(p)} onClick={() => toggle(p)}>
                                            <span className="sr-mini"><Garment shape={p.shape} color={p.hex} /></span>
                                            <span className="sr-name">{p.name ?? p.id}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="sr-submit">

                    <button className="button button-primary" disabled={!hasInput} onClick={() => setSent(true)}>
                        Siųsti stilistui
                    </button>
                    {!hasInput && <span className="muted">Privalote pridėti informacijos bent vienoje dalyje</span>}
                </div>
            </div>
        </section>
    );
}
