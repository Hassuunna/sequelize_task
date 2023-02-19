/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('levels', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    level_name: {
      type: Sequelize.STRING
    },
    level_id: {
      type: Sequelize.INTEGER
    },
    data_objectId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'data_objects',
        key: 'id',
        as: 'data_objectId',
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  })
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('levels')
}