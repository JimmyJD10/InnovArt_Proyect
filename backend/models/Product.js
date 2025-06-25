const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  titulo: { type: DataTypes.STRING(100), allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  precio: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  imagen: { type: DataTypes.STRING(255) },
  usuarioId: { type: DataTypes.INTEGER },
  destacado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: 'productos',
  timestamps: false
});

// Relación correcta
Product.belongsTo(User, { as: 'artesano', foreignKey: 'usuarioId' });

module.exports = Product;
