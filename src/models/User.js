// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false }, // select: false para não vir por padrão nas buscas
});

// Hook que executa antes de salvar ('pre save')
UserSchema.pre('save', async function(next) {
  // Se a senha não foi modificada, não faz nada
  if (!this.isModified('password')) return next();

  // Gera o hash com custo 12 (bom nível de segurança)
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});

module.exports = mongoose.model('User', UserSchema);