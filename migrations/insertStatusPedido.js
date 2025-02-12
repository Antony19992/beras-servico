module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('StatusPedido', [
      { descricao: 'Aguardando Pagamento', createdAt: new Date(), updatedAt: new Date() },
      { descricao: 'Preparando', createdAt: new Date(), updatedAt: new Date() },
      { descricao: 'Finalizado', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('StatusPedido', null, {});
  }
};
