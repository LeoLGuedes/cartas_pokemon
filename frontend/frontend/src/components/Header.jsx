import { useRef, useState, useEffect } from 'react';

const abas = [
    { id: 'buscar', label: 'Buscar Carta', icon: '🔍' },
    { id: 'lista', label: 'Lista de Cartas', icon: '📋' },
    { id: 'adicionar', label: 'Adicionar Carta', icon: '➕' },
    ];

function Header({ abaAtiva, setAbaAtiva }) {
    const [indicador, setIndicador] = useState({ left: 0, width: 0 });
    const botoesRef = useRef([]);

    useEffect(() => {
        const idx = abas.findIndex((a) => a.id === abaAtiva);
        const btn = botoesRef.current[idx];
        if (btn) {
            setIndicador({ left: btn.offsetLeft, width: btn.offsetWidth });
        }
    }, [abaAtiva]);

    return (
        <header className="header">
            <div className="header-brand">
                <span className="header-pokeball">⬤</span>
                <h1 className="header-title">PokéDeck</h1>
                <p><small>Leonardo Lino Guedes</small></p>
            </div>

            <nav className="header-nav">
                <div className="nav-track">
                    <span
                        className="nav-indicador"
                        style={{ left: indicador.left, width: indicador.width }}
                    />
                    {abas.map((aba, idx) => (
                        <button
                            key={aba.id}
                            ref={(el) => (botoesRef.current[idx] = el)}
                            className={`nav-btn ${abaAtiva === aba.id ? 'ativo' : ''}`}
                            onClick={() => setAbaAtiva(aba.id)}
                        >
                            <span className="nav-icon">{aba.icon}</span>
                            <span>{aba.label}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </header>
    );
}

export default Header;
