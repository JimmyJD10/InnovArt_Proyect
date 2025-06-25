const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro
exports.crearUsuario = async (req, res) => {
  try {
    const { correo, contraseña, rol, ...rest } = req.body;
    if (rol === 'admin') {
      return res.status(403).json({ mensaje: 'No puedes crear usuarios admin desde esta ruta' });
    }
    const existe = await User.findOne({ where: { correo } });
    if (existe) return res.status(400).json({ mensaje: 'Correo ya registrado' });
    const hash = await bcrypt.hash(contraseña, 10);
    const user = await User.create({ correo, contraseña: hash, rol, ...rest });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const user = await User.findOne({ where: { correo } });
    if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    const valid = await bcrypt.compare(contraseña, user.contraseña);
    if (!valid) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    const token = jwt.sign({ id: user.id, correo: user.correo, rol: user.rol }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
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