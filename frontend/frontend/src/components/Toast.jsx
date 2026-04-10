function Toast({ mensagem, tipo }) {
    return (
        <div className={`toast toast-${tipo}`}>
            <span className="toast-icone">{tipo === 'sucesso' ? '✅' : '❌'}</span>
            <span>{mensagem}</span>
        </div>
    );
}

export default Toast;
