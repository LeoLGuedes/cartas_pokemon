import { useState } from 'react';

const RARIDADES = ['Comum', 'Incomum', 'Raro', 'Ultra Raro', 'Lendária'];
const TIPOS = [
    'Normal', 'Fogo', 'Água', 'Planta', 'Elétrico', 'Gelo',
    'Lutador', 'Venenoso', 'Terra', 'Voador', 'Psíquico',
    'Pedra', 'Fantasma', 'Dragão', 'Sombrio', 'Aço',
];

function FormEdicao({ carta, onSalvar, onCancelar }) {
    const [form, setForm] = useState({
        nome: carta.nome || '',
        tipo: carta.tipo || '',
        vida: carta.vida || '',
        ataque1: carta.ataque1 || '',
        ataque2: carta.ataque2 || '',
        raridade: carta.raridade || '',
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSalvar({ ...form, vida: Number(form.vida) });
    }

    return (
        <form onSubmit={handleSubmit} className="form-edicao">
            <h4 className="form-edicao-titulo">Editando: {carta.nome}</h4>

            <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required />

            <select name="tipo" value={form.tipo} onChange={handleChange}>
                <option value="">Selecione o tipo</option>
                {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            <input name="vida" type="number" value={form.vida} onChange={handleChange} placeholder="Vida (PS)" required />
            <input name="ataque1" value={form.ataque1} onChange={handleChange} placeholder="Ataque 1" required />
            <input name="ataque2" value={form.ataque2} onChange={handleChange} placeholder="Ataque 2" />

            <select name="raridade" value={form.raridade} onChange={handleChange}>
                <option value="">Raridade</option>
                {RARIDADES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>

            <div className="form-edicao-acoes">
                <button type="submit" className="btn-salvar">Salvar</button>
                <button type="button" className="btn-cancelar" onClick={onCancelar}>Cancelar</button>
            </div>
        </form>
    );
}

export default FormEdicao;
