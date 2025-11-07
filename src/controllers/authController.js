// src/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateToken(params = {}) {
  return jwt.sign(params, process.env.JWT_SECRET, {
    expiresIn: 86400, // Expira em 24 horas
  });
}

module.exports = {
  async register(req, res) {
    const { email, name, password } = req.body;
    try {
      if (await User.findOne({ email })) {
        return res.status(400).send({ error: 'Usuário já existe' });
      }
      const user = await User.create({ name, email, password });

      // Não retornar a senha
      user.password = undefined;

      return res.send({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).send({ error: 'Falha no registro: ' + err });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        return res.status(400).send({ error: 'Usuário não encontrado' });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).send({ error: 'Senha inválida' });
      }

      user.password = undefined;

      res.send({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).send({ error: 'Falha no login: ' + err });
    }
  },
};