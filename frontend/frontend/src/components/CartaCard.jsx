import { useState } from 'react';
import FormEdicao from './FormEdicao';
import TipoIcone from './TipoIcone';

const coresTipo = {
    fogo: { bg: '#fff1ee', borda: '#f97316', badge: '#f97316', texto: '#9a3412' },
    água: { bg: '#eff6ff', borda: '#3b82f6', badge: '#3b82f6', texto: '#1e40af' },
    agua: { bg: '#eff6ff', borda: '#3b82f6', badge: '#3b82f6', texto: '#1e40af' },
    planta: { bg: '#f0fdf4', borda: '#22c55e', badge: '#22c55e', texto: '#166534' },
    elétrico: { bg: '#fefce8', borda: '#eab308', badge: '#eab308', texto: '#854d0e' },
    eletrico: { bg: '#fefce8', borda: '#eab308', badge: '#eab308', texto: '#854d0e' },
    psíquico: { bg: '#fdf4ff', borda: '#a855f7', badge: '#a855f7', texto: '#6b21a8' },
    psiquico: { bg: '#fdf4ff', borda: '#a855f7', badge: '#a855f7', texto: '#6b21a8' },
    gelo: { bg: '#f0f9ff', borda: '#38bdf8', badge: '#38bdf8', texto: '#075985' },
    lutador: { bg: '#fff7ed', borda: '#f59e0b', badge: '#f59e0b', texto: '#92400e' },
    venenoso: { bg: '#f5f3ff', borda: '#8b5cf6', badge: '#8b5cf6', texto: '#4c1d95' },
    terra: { bg: '#faf5eb', borda: '#a16207', badge: '#a16207', texto: '#78350f' },
    voador: { bg: '#f0f4ff', borda: '#818cf8', badge: '#818cf8', texto: '#3730a3' },
    pedra: { bg: '#f5f5f4', borda: '#78716c', badge: '#78716c', texto: '#44403c' },
    fantasma: { bg: '#faf5ff', borda: '#7c3aed', badge: '#7c3aed', texto: '#4c1d95' },
    dragão: { bg: '#eff6ff', borda: '#1d4ed8', badge: '#1d4ed8', texto: '#1e3a8a' },
    dragao: { bg: '#eff6ff', borda: '#1d4ed8', badge: '#1d4ed8', texto: '#1e3a8a' },
    sombrio: { bg: '#1f2937', borda: '#374151', badge: '#374151', texto: '#d1d5db' },
    aço: { bg: '#f1f5f9', borda: '#64748b', badge: '#64748b', texto: '#334155' },
    aco: { bg: '#f1f5f9', borda: '#64748b', badge: '#64748b', texto: '#334155' },
    normal: { bg: '#fafafa', borda: '#a3a3a3', badge: '#a3a3a3', texto: '#525252' },
};

function getCor(tipo) {
    if (!tipo) return coresTipo.normal;
    const chave = tipo.toLowerCase().trim();
    return coresTipo[chave] || coresTipo.normal;
}

const estrelas = {
    comum:      '★☆☆☆☆',
    incomum:    '★★☆☆☆',
    raro:       '★★★☆☆',
    ultra_raro: '★★★★☆',
    lendária:   '★★★★★',
    lendaria:   '★★★★★',
};

const corRaridade = {
    comum:      '#94a3b8',
    incomum:    '#22c55e',
    raro:       '#3b82f6',
    ultra_raro: '#a855f7',
    lendária:   '#f59e0b',
    lendaria:   '#f59e0b',
};

function CartaCard({ carta, onAtualizar, onExcluir, onVerDetalhe }) {
    const [editando, setEditando] = useState(false);
    const [confirmando, setConfirmando] = useState(false);
    const cor = getCor(carta.tipo);
    const chaveRaridade = carta.raridade?.toLowerCase().replace(' ', '_');

    function handleSalvar(dados) {
        onAtualizar(carta.id, dados);
        setEditando(false);
    }

    if (editando) {
        return (
        <div className="card-wrapper" style={{ borderColor: cor.borda }}>
            <div className="card" style={{ background: cor.bg }}>
                <FormEdicao carta={carta} onSalvar={handleSalvar} onCancelar={() => setEditando(false)} />
            </div>
        </div>
        );
    }

    return (
        <div
            className="card-wrapper"
            style={{ borderColor: cor.borda }}
            onClick={() => onVerDetalhe && onVerDetalhe(carta)}
            title="Clique para ver detalhes"
        >
            <div className="card card-clicavel" style={{ background: cor.bg }}>
                <div className="card-header">
                    <h3 className="card-nome">{carta.nome}</h3>

                    {/* Ícone fora do badge, badge só com texto */}
                    <div className="card-tipo-grupo">
                        <span
                            className="card-tipo-icone-externo"
                            style={{ background: cor.badge, color: '#fff' }}
                        >
                            <TipoIcone tipo={carta.tipo} size={28} />
                        </span>
                        <span className="card-badge" style={{ background: cor.badge, color: '#fff' }}>
                            {carta.tipo || 'Normal'}
                        </span>
                    </div>
                </div>

                <div className="card-vida">
                    <span className="vida-label">PS</span>
                    <span className="vida-valor" style={{ color: cor.borda }}>{carta.vida}</span>
                </div>

                <div className="card-ataques">
                    <div className="ataque">
                        <span className="ataque-icone">⚡</span>
                        <span>{carta.ataque1}</span>
                    </div>
                    {carta.ataque2 && (
                        <div className="ataque">
                            <span className="ataque-icone">⚡</span>
                            <span>{carta.ataque2}</span>
                        </div>
                    )}
                </div>

                {carta.raridade && (
                <div
                    className="card-raridade"
                    style={{ color: corRaridade[chaveRaridade] || cor.texto }}
                >
                    {estrelas[chaveRaridade] || '★☆☆☆☆'}{' '}
                    {carta.raridade.charAt(0).toUpperCase() + carta.raridade.slice(1)}
                </div>
                )}

                <div
                    className="card-acoes"
                    onClick={(e) => e.stopPropagation()} // evita abrir detalhe ao clicar nos botões
                >
                <button
                    className="btn-editar"
                    style={{ borderColor: cor.borda, color: cor.borda }}
                    onClick={() => setEditando(true)}
                >
                    Editar
                </button>

                {confirmando ? (
                    <div className="confirmar-exclusao">
                        <span>Excluir?</span>
                        <button className="btn-confirmar" onClick={() => onExcluir(carta.id)}>Sim</button>
                        <button className="btn-cancelar-mini" onClick={() => setConfirmando(false)}>Não</button>
                    </div>
                ) : (
                    <button className="btn-excluir" onClick={() => setConfirmando(true)}>
                        Excluir
                    </button>
                )}
                </div>
            </div>
        </div>
    );
}

export default CartaCard;
