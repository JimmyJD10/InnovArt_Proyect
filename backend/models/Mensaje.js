const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Mensaje = sequelize.define('Mensaje', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  emisorId: { type: DataTypes.INTEGER },
  receptorId: { type: DataTypes.INTEGER },
  contenido: { type: DataTypes.TEXT, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'mensajes',
  timestamps: false
});

module.exports = Mensaje;
