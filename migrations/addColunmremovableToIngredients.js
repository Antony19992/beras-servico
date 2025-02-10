module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Ingredients', 'removable', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Ingredients', 'removable');
  }
};