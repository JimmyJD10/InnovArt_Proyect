const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pedido = sequelize.define('Pedido', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  productoId: { type: DataTypes.INTEGER },
  clienteId: { type: DataTypes.INTEGER },
  cantidad: { type: DataTypes.INTEGER, defaultValue: 1 },
  estado: { type: DataTypes.ENUM('pendiente', 'enviado', 'completado'), defaultValue: 'pendiente' },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'pedidos',
  timestamps: false
});

module.exports = Pedido;
