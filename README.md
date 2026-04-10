Autor: Leonardo Lino Guedes

# Sistema de Cartas Pokémon

Este projeto é um sistema web completo desenvolvido com React (frontend), Node.js com Express (backend) e MySQL (banco de dados).

O sistema permite cadastrar, visualizar, editar e excluir cartas Pokémon (CRUD).

---

##  Tecnologias utilizadas

- React
- Node.js
- Express
- MySQL
- Axios

---

##  Como rodar o projeto

### 1. Banco de dados

- Importar o arquivo `.sql` no MySQL
- Criar o banco de dados
- Ajustar usuário e senha no arquivo de conexão do backend (`db.js`)

---

## 2. Backend
Para Rodar:

- cd backend
- npm install
- cd src
- node server.js

Servidor rodará em:

http://localhost:3000

## 3. Frontend

- cd frontend
- cd frontend
- npm install
- npm run dev

# Aplicação rodará em:

http://localhost:5173

### Funcionalidades
- Listar todas as cartas
- Buscar carta por nome
- Cadastrar nova carta
- Editar carta
- Excluir carta
- Visualizar detalhes da carta com imagem automática do Pokémon

### Observações
- O backend deve estar rodando para o frontend funcionar
- Caso haja erro de conexão, verificar configurações do banco de dados
