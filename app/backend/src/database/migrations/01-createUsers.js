module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('users', {
        id: {
          primaryKey: true,
          autoIncrement: true,
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('users');
    },
  };