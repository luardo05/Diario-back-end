// src/controllers/eventController.js
const Event = require('../models/Event');

module.exports = {
  // A função 'index' permanece a mesma
  async index(req, res) {
    try {
      const events = await Event.find({ user: req.userId }).sort('-date');
      return res.json(events);
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao listar eventos' });
    }
  },

  // --- FUNÇÃO 'create' MODIFICADA ---
  async create(req, res) {
    try {
      const { title, date, description } = req.body;
      
      // ALTERAÇÃO: Agora, o multer-storage-cloudinary nos dá a propriedade 'path',
      // que contém a URL completa da imagem hospedada.
      // Se nenhum arquivo for enviado, req.file será undefined, e 'photoUrl' será uma string vazia.
      const photoUrl = req.file ? req.file.path : '';

      const event = await Event.create({
        title,
        date,
        description,
        photo: photoUrl, // Salvamos a URL do Cloudinary (ou a string vazia) no banco de dados
        user: req.userId,
      });

      return res.status(201).json(event);
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao criar novo evento: ' + err });
    }
  },
  // --- FIM DA MODIFICAÇÃO ---

  // A função 'update' permanece a mesma
  async update(req, res) {
    try {
      const { title, date, description } = req.body;
      const event = await Event.findById(req.params.id);

      if (String(event.user) !== req.userId) {
        return res.status(401).send({ error: 'Você não tem permissão para editar este evento.' });
      }

      await event.updateOne({ title, date, description });

      return res.send({ message: 'Evento atualizado com sucesso!' });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao atualizar evento' });
    }
  },

  // A função 'delete' permanece a mesma
  async delete(req, res) {
    try {
      const event = await Event.findById(req.params.id);

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