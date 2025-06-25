const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre_completo: { type: DataTypes.STRING(100), allowNull: false },
  correo: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  contraseña: { type: DataTypes.STRING(255), allowNull: false },
  foto_perfil: { type: DataTypes.STRING(255) },
  telefono: { type: DataTypes.STRING(30) },
  genero: { type: DataTypes.STRING(20) },
  fecha_nacimiento: { type: DataTypes.DATE },
  direccion: { type: DataTypes.STRING(255) },
  ciudad: { type: DataTypes.STRING(100) },
  pais: { type: DataTypes.STRING(100) },
  fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  rol: { type: DataTypes.ENUM('cliente', 'artesano', 'admin'), allowNull: false, defaultValue: 'cliente' },
  destacado: { type: DataTypes.BOOLEAN, defaultValue: false },

  // Artesano extra
  descripcion: { type: DataTypes.TEXT },
  especialidades: { type: DataTypes.STRING(255) }, // CSV o JSON string
  portafolio: { type: DataTypes.TEXT }, // JSON string de URLs
  redes_sociales: { type: DataTypes.TEXT }, // JSON string
  calificacion_promedio: { type: DataTypes.FLOAT, defaultValue: 0 },
  total_reseñas: { type: DataTypes.INTEGER, defaultValue: 0 },
  disponibilidad: { type: DataTypes.STRING(50) },
  metodos_pago_aceptados: { type: DataTypes.STRING(255) }, // CSV o JSON string
  ubicacion_precisa: { type: DataTypes.STRING(100) }, // lat,lng
  certificaciones: { type: DataTypes.TEXT }, // JSON string o texto
  experiencia_anios: { type: DataTypes.INTEGER, defaultValue: 0 },

  // Cliente extra
  favoritos: { type: DataTypes.TEXT }, // JSON string de IDs
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = User;