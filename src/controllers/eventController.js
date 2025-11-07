// src/controllers/eventController.js
const Event = require('../models/Event');

module.exports = {
  // Listar todos os eventos do usuário logado
  async index(req, res) {
    try {
      const events = await Event.find({ user: req.userId }).sort('-date');
      return res.json(events);
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao listar eventos' });
    }
  },

  // Criar um novo evento
  async create(req, res) {
    try {
      const { title, date, description } = req.body;
      const { filename } = req.file; // Pega o nome do arquivo do multer

      const event = await Event.create({
        title,
        date,
        description,
        photo: filename,
        user: req.userId, // ID vem do middleware
      });

      return res.status(201).json(event);
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao criar novo evento: ' + err });
    }
  },

  // Atualizar um evento
  async update(req, res) {
    try {
      const { title, date, description } = req.body;
      const event = await Event.findById(req.params.id);

      // Verifica se o evento pertence ao usuário logado
      if (String(event.user) !== req.userId) {
        return res.status(401).send({ error: 'Você não tem permissão para editar este evento.' });
      }

      await event.updateOne({ title, date, description });

      return res.send({ message: 'Evento atualizado com sucesso!' });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao atualizar evento' });
    }
  },

  // Deletar um evento
  async delete(req, res) {
    try {
      const event = await Event.findById(req.params.id);

      // Verifica se o evento pertence ao usuário logado
      if (String(event.user) !== req.userId) {
        return res.status(401).send({ error: 'Você não tem permissão para apagar este evento.' });
      }

      await event.deleteOne();

      return res.send({ message: 'Evento deletado com sucesso!' });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao deletar evento' });
    }
  },
};