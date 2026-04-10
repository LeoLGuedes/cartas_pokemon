import { useState, useEffect } from 'react';
import api from './services/api';
import ListaCartas from './components/ListaCartas';
import BuscaCarta from './components/BuscaCarta';
import FormCarta from './components/FormCarta';
import Header from './components/Header';
import Toast from './components/Toast';
import './App.css';

function App() {
    const [abaAtiva, setAbaAtiva] = useState('lista');
    const [cartas, setCartas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    function mostrarToast(mensagem, tipo = 'sucesso') {
        setToast({ mensagem, tipo });
        setTimeout(() => setToast(null), 3000);
    }

    async function carregarCartas() {
        setLoading(true);
        try {
            const resposta = await api.get('/cartas');
            setCartas(resposta.data);
        } catch (erro) {
            mostrarToast('Erro ao carregar cartas', 'erro');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {carregarCartas()}, []);

    async function cadastrarCarta(novaCarta) {
        try {
            await api.post('/cartas', novaCarta);
            mostrarToast('Carta cadastrada com sucesso!');
            carregarCartas(); //para ja carregar as cartas com a nova adicionada
            setAbaAtiva('lista'); //retorna automaticamente para a aba inicial
        } catch (erro) {
            mostrarToast('Erro ao cadastrar carta', 'erro'); //a rota não conseguiu cadastrar por algum motivo
        }
    }

    async function atualizarCarta(id, dadosAtualizados) {
        try {
            await api.put(`/cartas/${id}`, dadosAtualizados);
            mostrarToast('Carta atualizada com sucesso!');
            carregarCartas(); //atualiza automaticamente o elemento mudado da carta apos altera-lo
        } catch (erro) {
            mostrarToast('Erro ao atualizar carta', 'erro');
        }
    }

    async function excluirCarta(id) {
        try {
            await api.delete(`/cartas/${id}`);
            mostrarToast('Carta excluída!');
            carregarCartas(); //atualiza a lista sem o item removido automaticamente
        } catch (erro) {
            mostrarToast('Erro ao excluir carta', 'erro');
        }
    }

    return (
        <div className="app">
            <Header abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />

            <main className="main-content">
                {abaAtiva === 'lista' && (
                    <ListaCartas
                        cartas={cartas}
                        loading={loading}
                        onAtualizar={atualizarCarta}
                        onExcluir={excluirCarta}
                    />
                )}
                {abaAtiva === 'buscar' && (
                    <BuscaCarta
                        onAtualizar={atualizarCarta}
                        onExcluir={excluirCarta}
                    />
                )}
                {abaAtiva === 'adicionar' && (
                    <FormCarta onSalvar={cadastrarCarta} />
                )}
            </main>

            {toast && <Toast mensagem={toast.mensagem} tipo={toast.tipo} />}
        </div>
    );
}

export default App;
