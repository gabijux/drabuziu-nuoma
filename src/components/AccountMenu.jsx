import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAccount } from '../context/AccountContext.jsx';

export default function AccountMenu() {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const { pathname } = useLocation();
    const { newCount } = useAccount();

    useEffect(() => setOpen(false), [pathname]);
    useEffect(() => {
        if (!open) return undefined;
        const onDown = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
        const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
        document.addEventListener('mousedown', onDown);
        document.addEventListener('keydown', onKey);
        return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
    }, [open]);

    return (
        <div className="account-menu" ref={ref}>
            <button
                type="button"
                className="account-toggle"
                aria-label="Paskyros meniu"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={() => setOpen((o) => !o)}
            >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
                {newCount > 0 && <span className="account-dot" aria-hidden="true" />}
            </button>

            {open && (
                <div className="account-dropdown">
                    <Link to="/profilis">Profilis</Link>
                    <Link to="/stilisto-pasiulymai">
                        Gauti stilisto pasiūlymai

                    </Link>
                    <Link to="/asm-pasiulymas">Nauja užklausa stilistui</Link>
                </div>
            )}
        </div>
    );
}
