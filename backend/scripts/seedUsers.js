const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sequelize = require('../config/db');
require('dotenv').config();

async function seed() {
  await sequelize.sync();

  const users = [];
  for (let i = 1; i <= 25; i++) {
    users.push({
      nombre_completo: `Cliente ${i}`,
      correo: `cliente${i}@mail.com`,
      contraseña: await bcrypt.hash('123456', 10),
      rol: 'cliente',
      telefono: `9000000${i}`,
      genero: i % 2 === 0 ? 'Masculino' : 'Femenino',
      fecha_nacimiento: `199${i % 10}-0${(i % 9) + 1}-15`,
      direccion: `Av. Principal ${i} - Lima`,
      ciudad: 'Lima',
      pais: 'Perú',
      fecha_registro: new Date(),
      foto_perfil: `https://randomuser.me/api/portraits/men/${i}.jpg`,
      // Artesano extra (null para clientes)
      descripcion: null,
      especialidades: null,
      portafolio: null,
      redes_sociales: null,
      calificacion_promedio: null,
      total_reseñas: null,
      disponibilidad: null,
      metodos_pago_aceptados: null,
      ubicacion_precisa: null,
      certificaciones: null,
      experiencia_anios: null,
      // Cliente extra
      favoritos: JSON.stringify([2, 4, 6, 8].map(n => n + i))
    });
  }
  for (let i = 1; i <= 25; i++) {
    users.push({
      nombre_completo: `Artesano ${i}`,
      correo: `artesano${i}@mail.com`,
      contraseña: await bcrypt.hash('123456', 10),
      rol: 'artesano',
      telefono: `9800000${i}`,
      genero: i % 2 === 0 ? 'Femenino' : 'Masculino',
      fecha_nacimiento: `198${i % 10}-0${(i % 9) + 1}-20`,
      direccion: `Calle Artesanos ${i} - Cusco`,
      ciudad: 'Cusco',
      pais: 'Perú',
      fecha_registro: new Date(),
      foto_perfil: `https://randomuser.me/api/portraits/women/${i}.jpg`,
      // Artesano extra
      descripcion: `Soy el artesano número ${i} especializado en cerámica y textiles.`,
      especialidades: 'Cerámica,Textiles',
      portafolio: JSON.stringify([
        'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
      ]),
      redes_sociales: JSON.stringify({
        facebook: `https://facebook.com/artesano${i}`,
        instagram: `https://instagram.com/artesano${i}`,
        whatsapp: `https://wa.me/519800000${i}`
      }),
      calificacion_promedio: Number((Math.random() * 2 + 3).toFixed(1)),
      total_reseñas: Math.floor(Math.random() * 30) + 1,
      disponibilidad: i % 2 === 0 ? 'Disponible' : 'No disponible',
      metodos_pago_aceptados: 'Efectivo,Transferencia,Yape,Plin',
      ubicacion_precisa: `-13.5${i},-71.9${i}`,
      certificaciones: JSON.stringify([`Certificado Artesanal ${i}`, `Premio Regional ${i}`]),
      experiencia_anios: Math.floor(Math.random() * 20) + 1,
      // Cliente extra (null para artesanos)
      favoritos: null
    });
  }

  await User.bulkCreate(users, { ignoreDuplicates: true });
  console.log('Usuarios de prueba insertados correctamente');
  process.exit();
}

seed();
