const express = require('express');
const router = express.Router();
const resenaController = require('../controllers/resenaController');
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

router.post('/', resenaController.crearResena);
router.get('/', resenaController.obtenerResenas);
router.get('/:id', resenaController.obtenerResenaPorId);
router.put('/:id', resenaController.actualizarResena);
router.delete('/:id', auth, admin, resenaController.eliminarResena);

module.exports = router;
