const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');
const { body } = require('express-validator');

// Registro público (solo cliente o artesano)
router.post('/',
  [
    body('nombre_completo').notEmpty().withMessage('Nombre completo requerido'),
    body('correo').isEmail().withMessage('Correo inválido'),
    body('contraseña').isLength({ min: 8 }).withMessage('Contraseña debe tener al menos 8 caracteres'),
    body('confirmar_contraseña').custom((value, { req }) => value === req.body.contraseña).withMessage('Las contraseñas no coinciden'),
    body('rol').optional().isIn(['cliente', 'artesano']).withMessage('Rol inválido'),
    // Opcionales
    body('telefono').optional().isString(),
    body('genero').optional().isString(),
    body('fecha_nacimiento').optional().isDate(),
    body('direccion').optional().isString(),
    body('ciudad').optional().isString(),
    body('pais').optional().isString(),
    // Artesano extra
    body('descripcion').optional().isString(),
    body('especialidades').optional().isString(),
    body('portafolio').optional().isString(),
    body('redes_sociales').optional().isString(),
    body('metodos_pago_aceptados').optional().isString(),
    body('certificaciones').optional().isString(),
    body('experiencia_anios').optional().isInt(),
    body('ubicacion_precisa').optional().isString()
  ],
  userController.crearUsuario
);
router.post('/login',
  [
    body('correo').isEmail().withMessage('Correo inválido'),
    body('contraseña').notEmpty().withMessage('Contraseña requerida')
  ],
  userController.login
);

// Obtener todos los usuarios (solo admin, excepto filtro de artesanos)
router.get('/', async (req, res, next) => {
  try {
    // Permitir acceso público solo a la lista de artesanos
    if (req.query.rol === 'artesano') {
      return userController.obtenerUsuarios(req, res, next);
    }
    // Para otros casos, requiere admin
    return auth(req, res, () => admin(req, res, () => userController.obtenerUsuarios(req, res, next)));
  } catch (err) {
    next(err);
  }
});

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
  const { Op } = require('sequelize');
  const where = { rol: 'artesano' };
  if (q) {
    where.nombre_completo = { [Op.like]: `%${q}%` };
  }
  if (categoria) {
    where.especialidades = { [Op.like]: `%${categoria}%` };
  }
  if (ubicacion) {
    // Puedes ajustar el campo según tu modelo, aquí se usa 'ciudad'
    where.ciudad = { [Op.like]: `%${ubicacion}%` };
  }
  try {
    const artesanos = await require('../models/User').findAll({ where, limit: 10 });
    res.json(artesanos);
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;