// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const auth = require('./middlewares/authMiddleware');

// Rutas
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const resenaRoutes = require('./routes/resenaRoutes');
app.use('/api/resenas', resenaRoutes);

const mensajeRoutes = require('./routes/mensajeRoutes');
app.use('/api/mensajes', mensajeRoutes);

const pedidoRoutes = require('./routes/pedidoRoutes');
// Ejemplo: proteger pedidos
app.use('/api/pedidos', auth, pedidoRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API backend funcionando');
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(err.status || 500).json({ mensaje: err.message || 'Error interno del servidor' });
});

module.exports = app;
