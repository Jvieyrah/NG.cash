module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      balance: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        Field:'balance'
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('accounts');
  },
};