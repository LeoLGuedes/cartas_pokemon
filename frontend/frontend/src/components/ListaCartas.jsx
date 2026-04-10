import { useState } from 'react';
import CartaCard from './CartaCard';
import DetalheCarta from './DetalheCarta';

function ListaCartas({ cartas, loading, onAtualizar, onExcluir }) {
    const [cartaDetalhe, setCartaDetalhe] = useState(null);

    // Mantém o detalhe sincronizado se a carta for editada
    function handleAtualizar(id, dados) {
        onAtualizar(id, dados);
        if (cartaDetalhe?.id === id) {
            setCartaDetalhe((prev) => ({ ...prev, ...dados }));
        }
    }

    function handleExcluir(id) {
        onExcluir(id);
        if (cartaDetalhe?.id === id) setCartaDetalhe(null);
    }

    if (loading) {
        return (
        <div className="tela-estado">
            <div className="spinner" />
            <p>Carregando cartas...</p>
        </div>
        );
    }

    if (cartas.length === 0) {
        return (
        <div className="tela-estado">
            <span className="estado-icone">🃏</span>
            <p>Nenhuma carta cadastrada ainda.</p>
        </div>
        );
    }

    return (
        <section className="secao">
            <div className="secao-header">
                <h2 className="secao-titulo">Coleção de Cartas</h2>
                <span className="secao-contador">{cartas.length} carta{cartas.length !== 1 ? 's' : ''}</span>
            </div>

            <div className="grid-cartas">
                {cartas.map((carta) => (
                    <CartaCard
                        key={carta.id}
                        carta={carta}
                        onAtualizar={handleAtualizar}
                        onExcluir={handleExcluir}
                        onVerDetalhe={setCartaDetalhe}
                    />
                ))}
            </div>

            {cartaDetalhe && (
                <DetalheCarta
                    carta={cartaDetalhe}
                    onFechar={() => setCartaDetalhe(null)}
                    onAtualizar={handleAtualizar}
                    onExcluir={handleExcluir}
                />
            )}
        </section>
    );
}

export default ListaCartas;
