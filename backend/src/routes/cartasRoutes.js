const express = require('express');
const router = express.Router();

const conexao = require('../config/db');

//rota para testar
router.get('/', (req, res) => {
    res.json({mensagem: 'API funcionando'})
})


//==================================== GETs (visualizar) ====================================
//endpoint para retornar todos os itens da lista do DB
router.get('/cartas', (req, res) =>{
    const query = ' SELECT * FROM cartas'; //query para listar todos os itens

    conexao.query(query, (erro, resultados) => {
        if(erro) {
            console.log('Erro ao buscar cartas ', erro)
            return res.status(500).json({erro : 'Erro ao buscar'})
        }
        res.json(resultados)
    })
})



//endpoint para retornar 1 elemento especifico do DB
router.get('/cartas/nome/:nome', (req, res) =>{
    const nome = req.params.nome; //acessa o json da req para pegar o nome do pokemon

    const query = 'SELECT * FROM cartas WHERE LOWER(nome) = LOWER(?)'; //o interrogação é substituido na operação abaixo
    conexao.query(query, [nome], (erro, resultados) =>{
        if(erro) { //caso de erro que não seja relacionado a ter encontrado ou não a carta
            console.error('Erro ao buscar carta: ', erro)
            return res.status(500).json({erro: 'Erro ao buscar carta'})
        }
        if(resultados.length === 0) { //aqui, não achou o resultado que bata com a busca
            return res.status(404).json({mensagem: 'carta não encontrada'})
        }
        res.json(resultados);
    });
})



//==================================== POST (Criar) ====================================
router.post('/cartas', (req, res) => {
    const {nome, tipo, vida, ataque1, ataque2, raridade} = req.body //montando o body que vai ser enviado

    if (typeof vida !== 'number') { //garantir que o valor de vida é um número
        return res.status(400).json({
            erro: 'Vida deve ser um número'
        });
    }

    if(!nome || !vida || !ataque1 || !ataque2 || !raridade) {
        return res.status(400).json({
            erro: 'Os campos nome, vida, ataque1, ataque2 e raridade são obrigatórios'
        });
    }

    const insert = `INSERT INTO cartas (nome, tipo, vida, ataque1, ataque2, raridade) 
                    VALUES (?, ?, ?, ?, ?, ?)`;
    conexao.query(insert, [nome, tipo, vida, ataque1, ataque2, raridade], (erro, resultado) => {
        if(erro) {
            console.log('Erro ao inserir a carta', erro); //erro de comunicação ou inserção
            return res.status(500).json({erro: 'erro ao cadastrar carta'})
        }

        res.status(201).json({
            mensagem: 'Carta cadastrada com sucesso',
            id: resultado.insertId, //id cadastrado no banco da carta
            carta: {nome, tipo, vida, ataque1, ataque2, raridade} //dados da carta
        });
    });
})



//==================================== PUT (Editar) ====================================
router.put('/cartas/:id', (req, res) => {
    const {id} = req.params;
    const {nome, tipo, vida, ataque1, ataque2, raridade} = req.body;

    let campos = []
    let valores = []

    if (typeof vida !== 'number') { //garantir que o valor de vida é um número
        return res.status(400).json({
            erro: 'Vida deve ser um número'
        });
    }

    if (nome !== undefined) { //esses campos são para conferir se existe conteudo a ser enviado referente a essa informação
        campos.push('nome = ?');
        valores.push(nome);
    }

    if (tipo !== undefined) {
        campos.push('tipo = ?');
        valores.push(tipo);
    }

    if (vida !== undefined) {
        campos.push('vida = ?');
        valores.push(vida);
    }

    if (ataque1 !== undefined) {
        campos.push('ataque1 = ?');
        valores.push(ataque1);
    }

    if (ataque2 !== undefined) {
        campos.push('ataque2 = ?');
        valores.push(ataque2);
    }

    if (raridade !== undefined) {
        campos.push('raridade = ?');
        valores.push(raridade);
    }

    // Se não veio nada para atualizar
    if (campos.length === 0) {
        return res.status(400).json({
        erro: 'Nenhum campo enviado para atualização'
        });
    }

    const sql = `
        UPDATE cartas
        SET ${campos.join(', ')}
        WHERE id = ?
    `;

    valores.push(id) //colocar o id no valores para ir por ultimo no WHERE

    conexao.query(sql, valores, (error, resultado) => {
        if(error){
            console.log('Erro ao atualizar carta:', error);
            return res.status(500).json({ error: 'Erro ao atualizar carta' });
        }

        if (resultado.affectedRows === 0) { //caso o envio seja feito e mesmo assim não retornar nenhuma linha alterada
            return res.status(404).json({ mensagem: 'Carta não encontrada' });
        }

        res.json({
            mensagem: 'Carta atualizada com sucesso'
        });
    })
})



//==================================== DELETE (Excluir) ====================================
router.delete('/cartas/:id', (req, res) => {
    const {id} = req.params

    const query = ` DELETE FROM cartas WHERE id = ?`

    conexao.query(query, [id], (error, resultado) => {
        if(error){
            console.error('Erro ao excluir carta:', error)
            return res.status(500).json({ error: 'Erro ao excluir carta' });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Carta não encontrada' });
        }

        res.json({ mensagem: 'Carta excluída com sucesso' });
    })
})

module.exports = router;