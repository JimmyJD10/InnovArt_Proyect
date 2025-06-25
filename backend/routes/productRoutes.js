const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

router.post('/', auth, admin, productController.crearProducto);
router.get('/', productController.obtenerProductos);
router.get('/:id', productController.obtenerProductoPorId);
router.put('/:id', auth, admin, productController.actualizarProducto);
router.delete('/:id', auth, admin, productController.eliminarProducto);
router.get('/search', async (req, res) => {
  const { q, categoria, ubicacion } = req.query;
  const where = {};
  if (q) {
    where.nombre = { [require('sequelize').Op.like]: `%${q}%` };
  }
  if (categoria) {
    where.categoria = categoria;
  }
  if (ubicacion) {
    where.ubicacion = ubicacion;
  }
  const productos = await require('../models/Product').findAll({ where, limit: 10 });
  res.json(productos);
});

module.exports = router;
