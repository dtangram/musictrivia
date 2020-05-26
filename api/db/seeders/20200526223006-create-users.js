module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        id: '712acaa6-7f3e-4dd3-96c9-ce74650133c9',
        username: 'dtangram',
        email: 'dtangram@gmail.com',
        password: 'password1234',
        access_token: 'abcd1234',
        type: 'regular',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()'),
      },
    ],
    {},
  ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
