import { useState } from 'react';

const RARIDADES = ['Comum', 'Incomum', 'Raro', 'Ultra Raro', 'Lendária'];
const TIPOS = [
    'Normal', 'Fogo', 'Água', 'Planta', 'Elétrico', 'Gelo',
    'Lutador', 'Venenoso', 'Terra', 'Voador', 'Psíquico',
    'Pedra', 'Fantasma', 'Dragão', 'Sombrio', 'Aço',
];

const FORM_INICIAL = {
    nome: '',
    tipo: '',
    vida: '',
    ataque1: '',
    ataque2: '',
    raridade: '',
};

function FormCarta({ onSalvar }) {
    const [form, setForm] = useState(FORM_INICIAL);
    const [enviando, setEnviando] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setEnviando(true);
        try {
            await onSalvar({ ...form, vida: Number(form.vida) });
            setForm(FORM_INICIAL);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <section className="secao secao-form">
            <div className="secao-header">
                <h2 className="secao-titulo">Nova Carta</h2>
                <p className="secao-subtitulo">Adicione um Pokémon à sua coleção</p>
            </div>

            <div className="form-card">
                <form onSubmit={handleSubmit} className="form-nova-carta">
                    <div className="campo-grupo">
                        <label>Nome do Pokémon *</label>
                        <input
                        type="text"
                        name="nome"
                        placeholder="Ex: Charizard"
                        value={form.nome}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className="campos-linha">
                        <div className="campo-grupo">
                            <label>Tipo</label>
                            <select name="tipo" value={form.tipo} onChange={handleChange}>
                                <option value="">Selecione o tipo</option>
                                {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>

                        <div className="campo-grupo">
                            <label>Vida (PS) *</label>
                            <input
                                type="number"
                                name="vida"
                                placeholder="Ex: 120"
                                value={form.vida}
                                onChange={handleChange}
                                min="1"
                                required
                            />
                        </div>
                    </div>

                    <div className="campo-grupo">
                        <label>Ataque 1 *</label>
                        <input
                            type="text"
                            name="ataque1"
                            placeholder="Ex: Lança-Chamas"
                            value={form.ataque1}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="campo-grupo">
                        <label>Ataque 2</label>
                        <input
                            type="text"
                            name="ataque2"
                            placeholder="Ex: Asa de Fogo"
                            value={form.ataque2}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-grupo">
                        <label>Raridade *</label>
                        <select name="raridade" value={form.raridade} onChange={handleChange} required>
                            <option value="">Selecione a raridade</option>
                            {RARIDADES.map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>

                    <button type="submit" className="btn-cadastrar" disabled={enviando}>
                        {enviando ? 'Cadastrando...' : '➕ Cadastrar Carta'}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default FormCarta;
