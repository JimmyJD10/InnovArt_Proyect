const Mensaje = require('../models/Mensaje');

exports.crearMensaje = async (req, res) => {
  try {
    const mensaje = await Mensaje.create(req.body);
    res.status(201).json(mensaje);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerMensajes = async (req, res) => {
  try {
    const mensajes = await Mensaje.findAll();
    res.status(200).json(mensajes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerMensajePorId = async (req, res) => {
  try {
    const mensaje = await Mensaje.findByPk(req.params.id);
    if (!mensaje) return res.status(404).json({ mensaje: 'Mensaje no encontrado' });
    res.status(200).json(mensaje);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarMensaje = async (req, res) => {
  try {
    const deleted = await Mensaje.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ mensaje: 'Mensaje no encontrado' });
    res.status(200).json({ mensaje: 'Mensaje eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
