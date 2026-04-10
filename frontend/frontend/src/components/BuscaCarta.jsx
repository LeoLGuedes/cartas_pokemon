import { useState } from 'react';
import api from '../services/api';
import CartaCard from './CartaCard';

function BuscaCarta({ onAtualizar, onExcluir }) {
    const [nome, setNome] = useState('');
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');
    const [buscou, setBuscou] = useState(false);

    async function handleBuscar(e) {
        e.preventDefault();
        if (!nome.trim()) return;

        setLoading(true);
        setErro('');
        setBuscou(true);

        try {
            const resposta = await api.get(`/cartas/nome/${nome.trim()}`);
            // backend retorna array ou objeto único dependendo da implementação
            const dados = Array.isArray(resposta.data) ? resposta.data : [resposta.data];
            setResultados(dados);
        } catch (err) {
            setResultados([]);
            setErro('Nenhuma carta encontrada com esse nome.');
        } finally {
            setLoading(false);
        }
    }

    function handleAtualizar(id, dados) {
        onAtualizar(id, dados);
        // Atualiza o card localmente também
        setResultados((prev) =>
            prev.map((c) => (c.id === id ? { ...c, ...dados } : c))
        );
    }

    function handleExcluir(id) {
        onExcluir(id);
        setResultados((prev) => prev.filter((c) => c.id !== id));
    }

    return (
        <section className="secao">
            <div className="secao-header">
                <h2 className="secao-titulo">Buscar Carta</h2>
            </div>

            <form onSubmit={handleBuscar} className="form-busca">
                <input
                    type="text"
                    placeholder="Digite o nome do Pokémon..."
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="input-busca"
                />
                <button type="submit" className="btn-buscar" disabled={loading}>
                    {loading ? 'Buscando...' : '🔍 Buscar'}
                </button>
            </form>

            {loading && (
                <div className="tela-estado">
                    <div className="spinner" />
                    <p>Buscando...</p>
                </div>
            )}

            {!loading && erro && (
                <div className="tela-estado">
                    <span className="estado-icone">😕</span>
                    <p>{erro}</p>
                </div>
            )}

            {!loading && !erro && buscou && resultados.length > 0 && (
                <>
                <p className="busca-resultado-info">
                    {resultados.length} resultado{resultados.length !== 1 ? 's' : ''} encontrado{resultados.length !== 1 ? 's' : ''}
                </p>
                <div className="grid-cartas">
                    {resultados.map((carta) => (
                        <CartaCard
                            key={carta.id}
                            carta={carta}
                            onAtualizar={handleAtualizar}
                            onExcluir={handleExcluir}
                        />
                    ))}
                </div>
                </>
            )}

            {!buscou && (
                <div className="tela-estado tela-estado-suave">
                    <span className="estado-icone">🔎</span>
                    <p>Digite o nome de um Pokémon para começar.</p>
                </div>
            )}
        </section>
    );
}

export default BuscaCarta;
