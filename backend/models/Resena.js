const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Resena = sequelize.define('Resena', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  comentario: { type: DataTypes.TEXT },
  calificacion: { type: DataTypes.INTEGER },
  clienteId: { type: DataTypes.INTEGER },
  artesanoId: { type: DataTypes.INTEGER },
  productoId: { type: DataTypes.INTEGER }, // <-- Agregado
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  destacada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: 'resenas',
  timestamps: false
});

module.exports = Resena;
