/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('elements', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    element_name: {
      type: Sequelize.STRING
    },
    levelId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'levels',
        key: 'id',
        as: 'levelId',
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
  await queryInterface.dropTable('elements')
}
