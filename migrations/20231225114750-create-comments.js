module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id: {
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING(12000),
      },
      user_id: {
        type: Sequelize.STRING,
      },
      request_id: {
        type: Sequelize.STRING,
      },
      file_ids: {
        type: Sequelize.STRING(2000),
      },
      academy: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("comments");
  },
};
