// Simulación de API para testing
// Este archivo simula el backend del proyecto real

const express = require('express');
const app = express();

// Endpoint ficticio para testing
app.get('/api/users', (req, res) => {
  res.json({
    message: 'API Testing - Lista de usuarios',
    users: [
      { id: 1, name: 'Usuario de prueba 1' },
      { id: 2, name: 'Usuario de prueba 2' }
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor de testing corriendo en puerto ${PORT}`);
});

module.exports = app;
