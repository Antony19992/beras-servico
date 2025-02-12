// src/models/StatusPedido.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const StatusPedido = sequelize.define('StatusPedido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = StatusPedido;