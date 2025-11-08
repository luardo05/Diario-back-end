// server.js
const express = require('express');
const connectDB = require('./src/config/database');
app.use(cors({ origin: '*' }));
const path = require('path'); // Adicione esta linha
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// ROTA PARA SERVIR ARQUIVOS ESTÁTICOS (IMAGENS)
// Cria uma rota '/files' que serve os arquivos da pasta 'uploads'
app.use('/files', express.static(path.resolve(__dirname, 'uploads')));

// ROTAS DA APLICAÇÃO
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/events', require('./src/routes/eventRoutes')); // Adicione esta linha

app.get('/', (req, res) => res.send('API do Diário Pessoal está no ar!'));
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));