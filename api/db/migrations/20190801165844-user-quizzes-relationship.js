module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Quizzes', 'userId', {
    type: Sequelize.UUID,
    references: {
      model: 'Users',
      key: 'id',
    },
  }),

  down: queryInterface => queryInterface.removeColumn('Quizzes', 'userId'),
};
