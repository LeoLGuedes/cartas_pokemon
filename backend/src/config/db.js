const mysql = require('mysql2')

const conexao = mysql.createConnection({ //cria conexão
    host: 'localhost',
    user: 'root',
    password: '446527',
    database: 'experiencia_criativa'
});

conexao.connect((erro) => {
    if(erro) {
        console.log('erro ao se conectar com o banco de dados')
        return;
    }
    console.log('Conectando ao banco de dados com sucesso')
});

module.exports = conexao //para exportar a conexao com o banco para outros arquivos




















