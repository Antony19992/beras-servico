module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Users', 'observacao', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Users', 'observacao');
    }
  };