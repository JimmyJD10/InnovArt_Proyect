// Script para poblar la tabla de productos con productos de prueba asociados a artesanos
const Product = require('../models/Product');
const sequelize = require('../config/db');
require('dotenv').config();

async function seed() {
  await sequelize.sync();

  const productos = [];
  for (let i = 1; i <= 25; i++) {
    productos.push({
      titulo: `Producto Artesanal ${i}`,
      descripcion: `Descripción del producto artesanal número ${i}. Hecho a mano con materiales de calidad.`,
      precio: (Math.random() * 100 + 20).toFixed(2),
      imagen: `https://source.unsplash.com/400x300/?craft,handmade,art,${i}`,
      categoria: i % 2 === 0 ? 'Cerámica' : 'Textiles',
      usuarioId: i + 25, // Relacionado con artesano (id 26-50)
      destacado: i % 5 === 0,
      stock: Math.floor(Math.random() * 20) + 1,
      ubicacion: 'Cusco',
      fecha_publicacion: new Date()
    });
  }

  await Product.bulkCreate(productos, { ignoreDuplicates: true });
  console.log('Productos de prueba insertados correctamente');
  process.exit();
}

seed();