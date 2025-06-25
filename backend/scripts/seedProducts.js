// Script para poblar productos de prueba en la base de datos
const Product = require('../models/Product');
const sequelize = require('../config/db');

async function seed() {
  try {
    await sequelize.sync();
    console.log('DB sincronizada');

    const productos = [
      {
        titulo: 'Jarrón de cerámica andina',
        descripcion: 'Jarrón hecho a mano con motivos tradicionales peruanos.',
        precio: 120.00,
        imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
        usuarioId: 1,
        destacado: true
      },
      {
        titulo: 'Alforja tejida a mano',
        descripcion: 'Bolso tradicional de lana de alpaca, colores vivos.',
        precio: 85.50,
        imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        usuarioId: 2,
        destacado: true
      },
      {
        titulo: 'Collar de plata y piedras',
        descripcion: 'Collar artesanal con piedras semipreciosas y plata peruana.',
        precio: 200.00,
        imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
        usuarioId: 3,
        destacado: false
      },
      {
        titulo: 'Escultura en madera de olivo',
        descripcion: 'Figura tallada en madera de olivo, acabado natural.',
        precio: 150.00,
        imagen: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        usuarioId: 4,
        destacado: false
      },
      {
        titulo: 'Tapiz ayacuchano',
        descripcion: 'Tapiz colorido tejido en telar tradicional de Ayacucho.',
        precio: 300.00,
        imagen: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
        usuarioId: 5,
        destacado: true
      },
      {
        titulo: 'Cartera de cuero repujado',
        descripcion: 'Cartera elegante de cuero con detalles repujados a mano.',
        precio: 180.00,
        imagen: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
        usuarioId: 6,
        destacado: false
      },
      {
        titulo: 'Pulsera de semillas amazónicas',
        descripcion: 'Pulsera ecológica hecha con semillas naturales de la Amazonía.',
        precio: 45.00,
        imagen: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=800&q=80',
        usuarioId: 7,
        destacado: true
      },
      {
        titulo: 'Sombrero de paja toquilla',
        descripcion: 'Sombrero tradicional tejido a mano, fresco y elegante.',
        precio: 95.00,
        imagen: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
        usuarioId: 8,
        destacado: false
      }
    ];

    const result = await Product.bulkCreate(productos, { ignoreDuplicates: true });
    console.log('Resultado de bulkCreate:', result);
    console.log('Productos de prueba insertados correctamente');
  } catch (err) {
    console.error('Error al insertar productos:', err);
  } finally {
    process.exit();
  }
}

seed();