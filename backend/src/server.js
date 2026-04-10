const express = require('express');
const cors = require('cors');

const cartasRoutes = require('./routes/cartasRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// rota de teste
app.get('/', (req, res) => {
    res.json({ mensagem: 'API funcionando' });
});

// usar rotas de cartas
app.use(cartasRoutes);

const PORT = 3000; //define qual porta o servidor backend vai rodar

app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});














