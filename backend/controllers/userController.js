const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Registro público (solo cliente o artesano)
exports.crearUsuario = async (req, res) => {
  // Validación de campos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errores: errors.array() });
  }
  // No permitir admin desde frontend
  if (req.body.rol && req.body.rol === 'admin') {
    return res.status(403).json({ mensaje: 'No puedes crear administradores desde el registro público' });
  }
  try {
    // Verifica correo único
    const existe = await User.findOne({ where: { correo: req.body.correo } });
    if (existe) {
      return res.status(409).json({ mensaje: 'El correo ya está registrado' });
    }
    // Encripta contraseña
    const hash = await bcrypt.hash(req.body.contraseña, 10);
    const data = { ...req.body, contraseña: hash, rol: req.body.rol === 'artesano' ? 'artesano' : 'cliente' };
    // Elimina campos no permitidos
    delete data.confirmar_contraseña;
    // Crea usuario
    const user = await User.create(data);
    res.status(201).json({ mensaje: 'Usuario registrado correctamente', user: { id: user.id, nombre_completo: user.nombre_completo, correo: user.correo, rol: user.rol } });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  // Validación de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errores: errors.array() });
  }
  try {
    const { correo, contraseña } = req.body;
    const user = await User.findOne({ where: { correo } });
    if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    const valid = await bcrypt.compare(contraseña, user.contraseña);
    if (!valid) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    // JWT_SECRET debe estar definido en producción
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'JWT_SECRET no configurado en el entorno' });
    }
    const token = jwt.sign(
      { id: user.id, correo: user.correo, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const where = {};
    if (req.query.rol) {
      where.rol = req.query.rol;
    }
    // Cambia 'createdAt' por 'id'
    const usuarios = await User.findAll({ where, limit: 20, order: [['id', 'DESC']] });
    res.json(usuarios);
  } catch (err) {
    console.error('Error en obtenerUsuarios:', err);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};

// Obtener usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    const user = await User.findByPk(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.status(200).json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener perfil propio
exports.obtenerPerfilPropio = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};