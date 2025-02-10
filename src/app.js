const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database');
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;

// Caminho para o arquivo do banco de dados
const dbPath = path.join(__dirname, '../database.sqlite');

// Verifica se o banco de dados já existe
if (!fs.existsSync(dbPath)) {
    // Se não existir, cria o banco de dados
    sequelize.sync()
        .then(() => {
            console.log('Banco de dados criado com sucesso!');
        })
        .catch(err => {
            console.error('Erro ao criar o banco de dados:', err);
        });
}

// Sincroniza o banco de dados
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