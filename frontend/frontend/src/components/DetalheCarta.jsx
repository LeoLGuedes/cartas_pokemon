import { useState, useEffect, useCallback } from 'react';
import TipoIcone from './TipoIcone';

const coresTipo = {
    fogo:     { bg: 'linear-gradient(160deg, #fff1ee 0%, #ffe4dc 100%)', borda: '#f97316', badge: '#f97316', texto: '#9a3412', holo: 'rgba(249,115,22,0.15)' },
    água:     { bg: 'linear-gradient(160deg, #eff6ff 0%, #dbeafe 100%)', borda: '#3b82f6', badge: '#3b82f6', texto: '#1e40af', holo: 'rgba(59,130,246,0.15)' },
    agua:     { bg: 'linear-gradient(160deg, #eff6ff 0%, #dbeafe 100%)', borda: '#3b82f6', badge: '#3b82f6', texto: '#1e40af', holo: 'rgba(59,130,246,0.15)' },
    planta:   { bg: 'linear-gradient(160deg, #f0fdf4 0%, #dcfce7 100%)', borda: '#22c55e', badge: '#22c55e', texto: '#166534', holo: 'rgba(34,197,94,0.15)' },
    elétrico: { bg: 'linear-gradient(160deg, #fefce8 0%, #fef08a 100%)', borda: '#eab308', badge: '#eab308', texto: '#854d0e', holo: 'rgba(234,179,8,0.2)' },
    eletrico: { bg: 'linear-gradient(160deg, #fefce8 0%, #fef08a 100%)', borda: '#eab308', badge: '#eab308', texto: '#854d0e', holo: 'rgba(234,179,8,0.2)' },
    psíquico: { bg: 'linear-gradient(160deg, #fdf4ff 0%, #f3e8ff 100%)', borda: '#a855f7', badge: '#a855f7', texto: '#6b21a8', holo: 'rgba(168,85,247,0.15)' },
    psiquico: { bg: 'linear-gradient(160deg, #fdf4ff 0%, #f3e8ff 100%)', borda: '#a855f7', badge: '#a855f7', texto: '#6b21a8', holo: 'rgba(168,85,247,0.15)' },
    gelo:     { bg: 'linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 100%)', borda: '#38bdf8', badge: '#38bdf8', texto: '#075985', holo: 'rgba(56,189,248,0.15)' },
    lutador:  { bg: 'linear-gradient(160deg, #fff7ed 0%, #fed7aa 100%)', borda: '#f59e0b', badge: '#f59e0b', texto: '#92400e', holo: 'rgba(245,158,11,0.15)' },
    venenoso: { bg: 'linear-gradient(160deg, #f5f3ff 0%, #ede9fe 100%)', borda: '#8b5cf6', badge: '#8b5cf6', texto: '#4c1d95', holo: 'rgba(139,92,246,0.15)' },
    terra:    { bg: 'linear-gradient(160deg, #faf5eb 0%, #fef3c7 100%)', borda: '#a16207', badge: '#a16207', texto: '#78350f', holo: 'rgba(161,98,7,0.12)' },
    voador:   { bg: 'linear-gradient(160deg, #f0f4ff 0%, #e0e7ff 100%)', borda: '#818cf8', badge: '#818cf8', texto: '#3730a3', holo: 'rgba(129,140,248,0.15)' },
    pedra:    { bg: 'linear-gradient(160deg, #f5f5f4 0%, #e7e5e4 100%)', borda: '#78716c', badge: '#78716c', texto: '#44403c', holo: 'rgba(120,113,108,0.12)' },
    fantasma: { bg: 'linear-gradient(160deg, #faf5ff 0%, #ede9fe 100%)', borda: '#7c3aed', badge: '#7c3aed', texto: '#4c1d95', holo: 'rgba(124,58,237,0.15)' },
    dragão:   { bg: 'linear-gradient(160deg, #eff6ff 0%, #bfdbfe 100%)', borda: '#1d4ed8', badge: '#1d4ed8', texto: '#1e3a8a', holo: 'rgba(29,78,216,0.15)' },
    dragao:   { bg: 'linear-gradient(160deg, #eff6ff 0%, #bfdbfe 100%)', borda: '#1d4ed8', badge: '#1d4ed8', texto: '#1e3a8a', holo: 'rgba(29,78,216,0.15)' },
    sombrio:  { bg: 'linear-gradient(160deg, #1f2937 0%, #111827 100%)', borda: '#374151', badge: '#374151', texto: '#d1d5db', holo: 'rgba(255,255,255,0.06)' },
    aço:      { bg: 'linear-gradient(160deg, #f1f5f9 0%, #e2e8f0 100%)', borda: '#64748b', badge: '#64748b', texto: '#334155', holo: 'rgba(100,116,139,0.12)' },
    aco:      { bg: 'linear-gradient(160deg, #f1f5f9 0%, #e2e8f0 100%)', borda: '#64748b', badge: '#64748b', texto: '#334155', holo: 'rgba(100,116,139,0.12)' },
    normal:   { bg: 'linear-gradient(160deg, #fafafa 0%, #f4f4f5 100%)', borda: '#a3a3a3', badge: '#a3a3a3', texto: '#525252', holo: 'rgba(163,163,163,0.12)' },
};

const raridade_config = {
    comum:       { label: 'Comum',       estrelas: 1, cor: '#94a3b8', brilho: false },
    incomum:     { label: 'Incomum',     estrelas: 2, cor: '#22c55e', brilho: false },
    raro:        { label: 'Raro',        estrelas: 3, cor: '#3b82f6', brilho: true  },
    ultra_raro:  { label: 'Ultra Raro',  estrelas: 4, cor: '#a855f7', brilho: true  },
    lendária:    { label: 'Lendária',    estrelas: 5, cor: '#f59e0b', brilho: true  },
    lendaria:    { label: 'Lendária',    estrelas: 5, cor: '#f59e0b', brilho: true  },
};

function getCor(tipo) {
    if (!tipo) return coresTipo.normal;
        return coresTipo[tipo.toLowerCase().trim()] || coresTipo.normal;
}

function getRaridade(raridade) {
    if (!raridade) return null;
        return raridade_config[raridade.toLowerCase().replace(' ', '_')] || null;
}

function normalizarNome(nome) {
    return nome
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')   // remove acentos
        .replace(/[^a-z0-9\s-]/g, '')      // remove caracteres especiais
        .replace(/\s+/g, '-');             // espaços → hífens
}

function EstrelaRaridade({ config }) {
    if (!config) return null;
    return (
        <div className="dc-raridade-estrelas">
            {Array.from({ length: 5 }).map((_, i) => (
                <span
                    key={i}
                    className={`dc-estrela ${i < config.estrelas ? 'dc-estrela-ativa' : ''} ${config.brilho && i < config.estrelas ? 'dc-estrela-brilho' : ''}`}
                    style={{ color: i < config.estrelas ? config.cor : '#e2e8f0' }}
                >★</span>
            ))}
            <span className="dc-raridade-label" style={{ color: config.cor }}>{config.label}</span>
        </div>
    );
}

function DetalheCarta({ carta, onFechar, onAtualizar, onExcluir }) {
    const [imgSrc, setImgSrc] = useState(null);
    const [imgStatus, setImgStatus] = useState('carregando'); // carregando | ok | erro
    const cor = getCor(carta.tipo);
    const raridadeConfig = getRaridade(carta.raridade);

    // Fecha com Escape
    const handleKey = useCallback((e) => {
        if (e.key === 'Escape') onFechar();
    }, [onFechar]);

    useEffect(() => {
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [handleKey]);

    // Busca imagem na PokéAPI
    useEffect(() => {
        if (!carta.nome) { setImgStatus('erro'); return; }
        setImgStatus('carregando');

        const slug = normalizarNome(carta.nome);

        fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`)
        .then((r) => {
            if (!r.ok) throw new Error('não encontrado');
            return r.json();
        })
        .then((data) => {
            // Prioridade: artwork oficial → sprite padrão
            const artwork = data.sprites?.other?.['official-artwork']?.front_default;
            const sprite  = data.sprites?.front_default;
            const img     = artwork || sprite;
            if (!img) throw new Error('sem imagem');
            setImgSrc(img);
            setImgStatus('ok');
        })
        .catch(() => setImgStatus('erro'));
    }, [carta.nome]);

    const ehEscuro = carta.tipo?.toLowerCase() === 'sombrio';

    return (
        <div className="dc-overlay" onClick={onFechar}>
            <div
                className={`dc-carta ${raridadeConfig?.brilho ? 'dc-carta-brilho' : ''}`}
                style={{ background: cor.bg, borderColor: cor.borda }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botão fechar */}
                <button className="dc-fechar" onClick={onFechar} style={{ color: cor.texto }}>✕</button>

                {/* ===== TOPO ===== */}
                <div className="dc-topo" style={{ borderBottomColor: cor.borda + '44' }}>
                    <div className="dc-topo-nome-vida">
                        <h2 className="dc-nome" style={{ color: ehEscuro ? '#f9fafb' : '#1a1d2e' }}>
                            {carta.nome}
                        </h2>
                        <div className="dc-vida-grupo">
                            <span className="dc-vida-label" style={{ color: cor.texto }}>PS</span>
                            <span className="dc-vida-valor" style={{ color: cor.borda }}>{carta.vida}</span>
                        </div>
                    </div>

                    {/* Badge de tipo: ícone do lado de fora, badge só com texto */}
                    <div className="dc-tipo-grupo">
                        <span
                            className="dc-tipo-icone-externo"
                            style={{ background: cor.badge, color: '#fff' }}
                        >
                            <TipoIcone tipo={carta.tipo} size={38} />
                        </span>
                        <span className="dc-tipo-badge" style={{ background: cor.badge }}>
                            {carta.tipo || 'Normal'}
                        </span>
                    </div>
                </div>

                {/* ===== IMAGEM ===== */}
                <div className="dc-imagem-area" style={{ background: cor.holo }}>
                    {imgStatus === 'carregando' && (
                        <div className="dc-img-placeholder">
                        <div className="spinner dc-spinner" />
                        </div>
                    )}
                    {imgStatus === 'ok' && (
                        <img
                            src={imgSrc}
                            alt={carta.nome}
                            className="dc-imagem"
                            onError={() => setImgStatus('erro')}
                        />
                    )}
                    {imgStatus === 'erro' && (
                        <div className="dc-img-placeholder dc-img-erro">
                            <span>?</span>
                            <p>Imagem não disponível</p>
                        </div>
                    )}

                    {/* Efeito holo para raras */}
                    {raridadeConfig?.brilho && <div className="dc-holo-overlay" />}
                </div>

                {/* ===== INFORMAÇÕES ===== */}
                <div className="dc-info">
                    {/* Raridade com estrelas */}
                    {raridadeConfig && <EstrelaRaridade config={raridadeConfig} />}

                    {/* Ataques */}
                    <div className="dc-ataques">
                        <div className="dc-ataque" style={{ borderLeftColor: cor.borda }}>
                            <span className="dc-ataque-label" style={{ color: cor.texto }}>Ataque 1</span>
                            <span className="dc-ataque-nome">{carta.ataque1 || '—'}</span>
                        </div>
                        {carta.ataque2 && (
                        <div className="dc-ataque" style={{ borderLeftColor: cor.borda }}>
                            <span className="dc-ataque-label" style={{ color: cor.texto }}>Ataque 2</span>
                            <span className="dc-ataque-nome">{carta.ataque2}</span>
                        </div>
                        )}
                    </div>

                    {/* Rodapé da carta */}
                    <div className="dc-rodape" style={{ borderTopColor: cor.borda + '33' }}>
                        <span className="dc-id" style={{ color: cor.texto }}>#{String(carta.id).padStart(3, '0')}</span>
                        <span className="dc-marca" style={{ color: cor.texto }}>PokéDeck</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetalheCarta;
