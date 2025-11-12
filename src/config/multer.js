// src/config/multer.js

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configura o Cloudinary com suas credenciais que estão nas variáveis de ambiente
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configura o "motor de armazenamento" do Multer para enviar os arquivos
// diretamente para a sua conta do Cloudinary.
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    // Define a pasta no Cloudinary onde as imagens serão salvas.
    // Isso ajuda a manter seu Cloudinary organizado.
    folder: 'diario-pessoal',
    
    // Define os formatos de imagem que são permitidos para upload.
    allowed_formats: ['jpg', 'jpeg', 'png'],
    
    // (Opcional, mas recomendado) Gera um nome de arquivo único para cada upload
    // para evitar conflitos.
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      // Remove espaços e caracteres especiais do nome original do arquivo
      const cleanOriginalName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '');
      return `event-${uniqueSuffix}-${cleanOriginalName}`;
    },
  },
});

// Exporta a configuração do Multer já com o novo motor de armazenamento.
module.exports = multer({ storage: storage });