// server.js - VERSÃO CORRETA E COMPLETA

// 1. IMPORTAÇÕES
const express = require('express');
const connectDB = require('./src/config/database');
const cors = require('cors'); // <-- Importação que estava faltando
const path = require('path');
require('dotenv').config();

// 2. CRIAÇÃO DA APLICAÇÃO EXPRESS
const app = express();

// 3. CONEXÃO COM O BANCO DE DADOS
connectDB();

// 4. CONFIGURAÇÃO DOS MIDDLEWARES
// Permite que requisições de qualquer origem acessem a API
app.use(cors({ origin: '*' }));
// Permite que o Express entenda requisições com corpo em JSON
app.use(express.json());

// Rota para servir os arquivos de imagem da pasta 'uploads'
app.use('/files', express.static(path.resolve(__dirname, 'uploads')));

// 5. DEFINIÇÃO DAS ROTAS DA APLICAÇÃO
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/events', require('./src/routes/eventRoutes'));

// Rota principal para verificar se a API está no ar
app.get('/', (req, res) => res.send('API do Diário Pessoal está no ar!'));

// 6. INICIALIZAÇÃO DO SERVIDOR
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));