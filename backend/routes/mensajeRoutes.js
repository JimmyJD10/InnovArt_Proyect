const express = require('express');
const router = express.Router();
const mensajeController = require('../controllers/mensajeController');
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

router.post('/', mensajeController.crearMensaje);
router.get('/', mensajeController.obtenerMensajes);
router.get('/:id', mensajeController.obtenerMensajePorId);
router.delete('/:id', auth, admin, mensajeController.eliminarMensaje);

module.exports = router;
