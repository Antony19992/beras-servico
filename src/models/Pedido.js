const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

    const Pedido = sequelize.define('Pedido', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        clienteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        statusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'StatusPedido',
                key: 'id'
            }
        },
        numero: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dataHora: {
            type: DataTypes.DATE,
            allowNull: false
        },
        itens: {
            type: DataTypes.JSON,
            allowNull: false
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        troco: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Pedido',
        tableName: 'Pedidos',
        timestamps: true
    });

    Pedido.associate = (models) => {
        Pedido.belongsTo(models.User, { foreignKey: 'clienteId' });
        Pedido.belongsTo(models.StatusPedido, { foreignKey: 'statusId' });
    };

module.exports = Pedido;