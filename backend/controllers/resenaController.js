const Resena = require('../models/Resena');

exports.crearResena = async (req, res) => {
  try {
    const resena = await Resena.create(req.body);
    res.status(201).json(resena);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerResenas = async (req, res) => {
  try {
    const where = {};
    if (req.query.destacadas === '1' || req.query.destacadas === 'true') {
      where.destacada = true;
    }
    // Filtro por productoId o artesanoId
    if (req.query.productoId) {
      where.productoId = req.query.productoId;
    }
    if (req.query.artesanoId) {
      where.artesanoId = req.query.artesanoId;
    }
    const resenas = await Resena.findAll({ where, limit: 10, order: [['createdAt', 'DESC']] });
    // Incluye productoId y artesanoId en la respuesta
    res.json(resenas.map(r => ({
      ...r.toJSON(),
      productoId: r.productoId,
      artesanoId: r.artesanoId
    })));
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener reseñas' });
  }
};

exports.obtenerResenaPorId = async (req, res) => {
  try {
    const resena = await Resena.findByPk(req.params.id);
    if (!resena) return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    res.status(200).json(resena);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarResena = async (req, res) => {
  try {
    const [updated] = await Resena.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    const resena = await Resena.findByPk(req.params.id);
    res.status(200).json(resena);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarResena = async (req, res) => {
  try {
    const deleted = await Resena.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    res.status(200).json({ mensaje: 'Reseña eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
