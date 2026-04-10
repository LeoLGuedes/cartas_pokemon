// Ícones SVG inline baseados nos símbolos oficiais dos tipos Pokémon
// Sem dependências externa — funciona direto no projeto

const icones = {
    fogo: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C10 5 8 6.5 8 9.5C8 10.8 8.5 12 9.5 13C9.2 11.5 10 10.5 11 10C10.5 12 11.5 13.5 13 14.5C12.5 13 13 11.8 14 11C13.8 13 14.5 14.5 14.5 16C14.5 18.2 13.5 19.5 12 20C14.5 19.5 17 17.5 17 14.5C17 12 15.5 10.5 15 9C16 10 16.5 11 16.5 12.5C17.5 11 18 9 17 7C16 5.5 14 4 12 2Z" />
        </svg>
    ),
    água: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3C12 3 5 10.5 5 15C5 18.9 8.1 22 12 22C15.9 22 19 18.9 19 15C19 10.5 12 3 12 3Z" />
        </svg>
    ),
    agua: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3C12 3 5 10.5 5 15C5 18.9 8.1 22 12 22C15.9 22 19 18.9 19 15C19 10.5 12 3 12 3Z" />
        </svg>
    ),
    planta: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 8C8 10 5.9 16.2 6 20C6 20 8 16 12 14C11.6 15.5 11.7 16.9 12.4 18.1C13.5 15.5 15.5 13 17 11C17 14 15.5 17 13 19C16.5 18 19.5 15.5 20 11C20.5 7 17 4 12 4C12 4 17 5 17 8Z" />
        </svg>
    ),
    elétrico: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z" />
        </svg>
    ),
    eletrico: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z" />
        </svg>
    ),
    gelo: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2V22M12 2L8 6M12 2L16 6M12 22L8 18M12 22L16 18M2 12H22M2 12L6 8M2 12L6 16M22 12L18 8M22 12L18 16M5.5 5.5L18.5 18.5M5.5 5.5L5.5 9.5M5.5 5.5L9.5 5.5M18.5 18.5L18.5 14.5M18.5 18.5L14.5 18.5M18.5 5.5L5.5 18.5M18.5 5.5L14.5 5.5M18.5 5.5L18.5 9.5M5.5 18.5L9.5 18.5M5.5 18.5L5.5 14.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
    ),
    lutador: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 6C16 7.1 15.1 8 14 8C12.9 8 12 7.1 12 6C12 4.9 12.9 4 14 4C15.1 4 16 4.9 16 6ZM7 9L9 8.5L11 10L10.5 12L8.5 11.5L8 9.5L10 9.5C10 9.5 9 8 8 8C7.5 8 6.5 8.5 6.5 9.5C6.5 10.5 7.5 11.5 8.5 12.5L10 20H12L13 16L15 20H17L15 12L17 11C18 10.5 18 9 17 8.5L14 8L12 9.5L10 8L7 9Z" />
        </svg>
    ),
    venenoso: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C9 2 7.5 4 7.5 5.5C7.5 6.5 8 7.5 8 8C6 8 4 9.5 4 12C4 14.5 6 15.5 6 15.5C5.5 17 6 19 7.5 20C8.5 20.5 10 21 12 21C14 21 15.5 20.5 16.5 20C18 19 18.5 17 18 15.5C18 15.5 20 14.5 20 12C20 9.5 18 8 16 8C16 7.5 16.5 6.5 16.5 5.5C16.5 4 15 2 12 2ZM10 11C10.8 11 11.5 11.7 11.5 12.5C11.5 13.3 10.8 14 10 14C9.2 14 8.5 13.3 8.5 12.5C8.5 11.7 9.2 11 10 11ZM14 11C14.8 11 15.5 11.7 15.5 12.5C15.5 13.3 14.8 14 14 14C13.2 14 12.5 13.3 12.5 12.5C12.5 11.7 13.2 11 14 11ZM12 15C13 15 13.5 15.5 13.5 16C13.5 16.5 13 17.5 12 17.5C11 17.5 10.5 16.5 10.5 16C10.5 15.5 11 15 12 15Z" />
        </svg>
    ),
    terra: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 16L5 10L8 14L11 8L14 12L17 6L20 14L22 10V20H2V16Z" />
        </svg>
    ),
    voador: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12C21 12 18 8 12 8C11 8 10 8.2 9 8.5L3 6V9L7 10.5C6.4 11.6 6 12.8 6 14C6 14 8 12 12 12C16 12 18 14 18 14C18 11.5 16 9.5 13 9C16 9 21 12 21 12Z" />
        </svg>
    ),
    psíquico: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 5C12 5 9 7 9 10M12 5C12 5 15 7 15 10M12 19C12 19 9 17 9 14M12 19C12 19 15 17 15 14M5 12C5 12 7 9 10 9M5 12C5 12 7 15 10 15M19 12C19 12 17 9 14 9M19 12C19 12 17 15 14 15" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
    ),
    psiquico: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 5C12 5 9 7 9 10M12 5C12 5 15 7 15 10M12 19C12 19 9 17 9 14M12 19C12 19 15 17 15 14M5 12C5 12 7 9 10 9M5 12C5 12 7 15 10 15M19 12C19 12 17 9 14 9M19 12C19 12 17 15 14 15" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
    ),
    pedra: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3L4 9L3 15L7 21H17L21 15L20 9L15 3H9ZM10 7H14L17 11L15.5 16H8.5L7 11L10 7Z" />
        </svg>
    ),
    fantasma: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3C8.1 3 5 6.1 5 10V21L7.5 19L10 21L12 19L14 21L16.5 19L19 21V10C19 6.1 15.9 3 12 3ZM10 11C9.4 11 9 10.6 9 10C9 9.4 9.4 9 10 9C10.6 9 11 9.4 11 10C11 10.6 10.6 11 10 11ZM14 11C13.4 11 13 10.6 13 10C13 9.4 13.4 9 14 9C14.6 9 15 9.4 15 10C15 10.6 14.6 11 14 11Z" />
        </svg>
    ),
    dragão: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3L18 7C16 5 13.5 4 11 4.5C9 5 7.5 6.5 7 8.5C6 12 8 15 10 16.5C8.5 16 6.5 14.5 5.5 12.5C4 15.5 5 19 7.5 21C9.5 22.5 12.5 23 15.5 21.5C18.5 20 20 17 20 14C20 12 19 10 17.5 8.5L20 3ZM13 9C14.1 9 15 9.9 15 11C15 12.1 14.1 13 13 13C11.9 13 11 12.1 11 11C11 9.9 11.9 9 13 9Z" />
        </svg>
    ),
    dragao: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3L18 7C16 5 13.5 4 11 4.5C9 5 7.5 6.5 7 8.5C6 12 8 15 10 16.5C8.5 16 6.5 14.5 5.5 12.5C4 15.5 5 19 7.5 21C9.5 22.5 12.5 23 15.5 21.5C18.5 20 20 17 20 14C20 12 19 10 17.5 8.5L20 3ZM13 9C14.1 9 15 9.9 15 11C15 12.1 14.1 13 13 13C11.9 13 11 12.1 11 11C11 9.9 11.9 9 13 9Z" />
        </svg>
    ),
    sombrio: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3ZM12 5C15.9 5 19 8.1 19 12C19 15.9 15.9 19 12 19C8.1 19 5 15.9 5 12C5 8.1 8.1 5 12 5ZM10 8C10 8 8 9 8 12C8 15 10 16 10 16L10 14C10 14 9 13.5 9 12C9 10.5 10 10 10 10V8ZM14 8V10C14 10 15 10.5 15 12C15 13.5 14 14 14 14V16C14 16 16 15 16 12C16 9 14 8 14 8Z" />
        </svg>
    ),
    aço: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.5 5.5L19 4L20 7.5L23 9L21 12L23 15L20 16.5L19 20L15.5 18.5L12 22L8.5 18.5L5 20L4 16.5L1 15L3 12L1 9L4 7.5L5 4L8.5 5.5L12 2ZM12 7C9.2 7 7 9.2 7 12C7 14.8 9.2 17 12 17C14.8 17 17 14.8 17 12C17 9.2 14.8 7 12 7ZM12 9C13.7 9 15 10.3 15 12C15 13.7 13.7 15 12 15C10.3 15 9 13.7 9 12C9 10.3 10.3 9 12 9Z" />
        </svg>
    ),
    aco: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.5 5.5L19 4L20 7.5L23 9L21 12L23 15L20 16.5L19 20L15.5 18.5L12 22L8.5 18.5L5 20L4 16.5L1 15L3 12L1 9L4 7.5L5 4L8.5 5.5L12 2ZM12 7C9.2 7 7 9.2 7 12C7 14.8 9.2 17 12 17C14.8 17 17 14.8 17 12C17 9.2 14.8 7 12 7ZM12 9C13.7 9 15 10.3 15 12C15 13.7 13.7 15 12 15C10.3 15 9 13.7 9 12C9 10.3 10.3 9 12 9Z" />
        </svg>
    ),
    normal: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="7" />
            <circle cx="12" cy="12" r="3" fill="white" opacity="0.5" />
        </svg>
    ),
};

function TipoIcone({ tipo, size = 14 }) {
    if (!tipo) return null;
        const chave = tipo.toLowerCase().trim();
        const icone = icones[chave] || icones.normal;

    return (
        <span
            className="tipo-icone"
            style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}
            title={tipo}
        >
        {icone}
        </span>
    );
}

export default TipoIcone;
