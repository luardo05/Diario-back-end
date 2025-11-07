const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Conectado com Sucesso!');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Encerra o processo com falha
  }
};

module.exports = connectDB;