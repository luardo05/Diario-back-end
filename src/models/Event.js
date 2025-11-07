// src/models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true }, // Armazenaremos o caminho/URL da foto
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referência ao usuário que criou o evento
    required: true,
  },
}, { timestamps: true }); // timestamps: true adiciona createdAt e updatedAt

module.exports = mongoose.model('Event', EventSchema);