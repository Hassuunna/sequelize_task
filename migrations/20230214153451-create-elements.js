/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  // logic for transforming into the new state
  return queryInterface.addColumn(
    'elements',
    'parent',
    Sequelize.STRING
  )
}
export async function down(queryInterface, Sequelize) {
  // logic for reverting the changes
  return queryInterface.removeColumn(
    'elements',
    'parent'
  )
}