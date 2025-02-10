const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  idImagem: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idComplementos: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  idIngredientes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  sequelize,
  modelName: 'Product',
});

module.exports = Product;
