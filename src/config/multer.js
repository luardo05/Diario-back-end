// src/config/multer.js
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
  // Como o multer vai armazenar os arquivos
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      // Gera 16 bytes aleatórios em formato hexadecimal
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        // Cria um nome de arquivo único: hash-nomeoriginal.extensão
        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, fileName);
      });
    },
  }),
};