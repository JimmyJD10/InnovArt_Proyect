const Resena = require('../models/Resena');
const sequelize = require('../config/db');
require('dotenv').config();

async function seed() {
  await sequelize.sync();

  const resenas = [];
  for (let i = 1; i <= 40; i++) {
    resenas.push({
      comentario: `Excelente trabajo del artesano ${i % 25 + 1}.`,
      calificacion: Math.floor(Math.random() * 3) + 3,
      clienteId: i % 25 + 1,
      artesanoId: (i % 25) + 26,
      productoId: i,
      fecha: new Date(),
      destacada: i % 7 === 0
    });
  }

  await Resena.bulkCreate(resenas, { ignoreDuplicates: true });
  console.log('Reseñas de prueba insertadas correctamente');
  process.exit();
}

seed();
