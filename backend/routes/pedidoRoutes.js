const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

router.post('/', auth, pedidoController.crearPedido);
router.get('/', auth, pedidoController.obtenerPedidos);
router.get('/:id', auth, pedidoController.obtenerPedidoPorId);
router.put('/:id', auth, pedidoController.actualizarPedido);
router.delete('/:id', auth, admin, pedidoController.eliminarPedido);

module.exports = router;
