// src/routes/eventRoutes.js
const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const upload = multer(multerConfig);

// A partir daqui, todas as rotas deste arquivo usarão o middleware de autenticação
router.use(authMiddleware);

// Rota para listar todos os eventos do usuário
router.get('/', eventController.index);

// Rota para criar um novo evento (com upload de foto)
router.post('/', upload.single('photo'), eventController.create);

// Rota para atualizar um evento
router.put('/:id', eventController.update);

// Rota para deletar um evento
router.delete('/:id', eventController.delete);

module.exports = router;