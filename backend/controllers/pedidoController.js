const Pedido = require('../models/Pedido');

exports.crearPedido = async (req, res) => {
  try {
    const pedido = await Pedido.create(req.body);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarPedido = async (req, res) => {
  try {
    const [updated] = await Pedido.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    const pedido = await Pedido.findByPk(req.params.id);
    res.status(200).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarPedido = async (req, res) => {
  try {
    const deleted = await Pedido.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    res.status(200).json({ mensaje: 'Pedido eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
