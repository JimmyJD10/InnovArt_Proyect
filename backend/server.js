// server.js
const app = require('./app');
const sequelize = require('./config/db');
const PORT = process.env.PORT || 3001;

// Sincroniza los modelos con la base de datos
sequelize.sync() // Usa { force: true } solo si quieres borrar y recrear todo cada vez
  .then(() => {
    console.log('🟢 Tablas sincronizadas');
    return sequelize.authenticate();
  })
  .then(() => {
    console.log('✅ Conectado a la base de datos');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend escuchando en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar con la base de datos:', err);
  });
