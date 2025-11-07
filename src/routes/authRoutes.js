// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;

// // src/routes/authRoutes.js
// const express = require('express');
// const router = express.Router();

// // GARANTA QUE O NOME AQUI SEJA IDÊNTICO AO NOME DO ARQUIVO
// const authController = require('../controllers/authController');

// router.post('/register', authController.register);
// router.post('/login', authController.login);

// module.exports = router;