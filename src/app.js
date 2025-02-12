const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('../config/database');
const userRoutes = require('./routes/userRoutes');
const calculateRoutes = require('./routes/calculateRoutes');
const productRoutes = require('./routes/productRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
//const bankRoutes = require('./routes/bankRoutes');

const app = express();

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', calculateRoutes);
app.use('/api', productRoutes);
app.use('/api', pedidoRoutes);
//app.use('/api', bankRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Erro ao sincronizar banco de dados:', error);
  });

module.exports = app;
