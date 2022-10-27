module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      team_name: {
        type: Sequelize.STRING,
        allowNull: false,
        Field:'team_name'
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  },
};