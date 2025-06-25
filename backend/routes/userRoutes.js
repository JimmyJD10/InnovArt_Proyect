const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

// Registro y login
router.post('/', userController.crearUsuario);
router.post('/login', userController.login);

// Obtener todos los usuarios (PÚBLICO para frontend)
router.get('/', userController.obtenerUsuarios);

// Obtener usuario por ID (público)
router.get('/:id', userController.obtenerUsuarioPorId);

// Perfil propio (requiere login)
router.get('/me', auth, userController.obtenerPerfilPropio);

// Actualizar y eliminar usuario (puedes proteger si quieres)
router.put('/:id', userController.actualizarUsuario);
router.delete('/:id', auth, admin, userController.eliminarUsuario);

// Búsqueda avanzada (opcional)
router.get('/search', async (req, res) => {
  const { q, categoria, ubicacion } = req.query;
  const where = { rol: 'artesano' };
  if (q) {
    where.nombre_completo = { [require('sequelize').Op.like]: `%${q}%` };
  }
  if (categoria) {
    where.especialidades = { [require('sequelize').Op.like]: `%${categoria}%` };
  }
  if (ubicacion) {
    where.ciudad = { [require('sequelize').Op.like]: `%${ubicacion}%` };
  }
  const artesanos = await require('../models/User').findAll({ where, limit: 10 });
  res.json(artesanos);
});

module.exports = router;