const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  complemento: {
    type: DataTypes.STRING,
  },
  valorFrete: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  ultimoPedido: {
    type: DataTypes.DATE,
    allowNull: true
  },
  observacao: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = User;