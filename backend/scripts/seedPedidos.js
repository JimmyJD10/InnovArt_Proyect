const Pedido = require('../models/Pedido');
const sequelize = require('../config/db');
require('dotenv').config();

async function seed() {
  await sequelize.sync();

  const pedidos = [];
  for (let i = 1; i <= 30; i++) {
    pedidos.push({
      productoId: i,
      clienteId: (i % 25) + 1,
      cantidad: Math.floor(Math.random() * 3) + 1,
      estado: ['pendiente', 'enviado', 'completado'][i % 3],
      fecha: new Date()
    });
  }

  await Pedido.bulkCreate(pedidos, { ignoreDuplicates: true });
  console.log('Pedidos de prueba insertados correctamente');
  process.exit();
}

seed();
