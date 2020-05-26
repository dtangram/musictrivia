module.exports = (sequelize, DataTypes) => {
  const Quizzes = sequelize.define('Quizzes', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: { args: 4, msg: 'ID not valid, please try again' },
      },
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [3, 500], msg: 'Quiz name is required' },
      },
    },
    type: {
      type: DataTypes.ENUM('public', 'private'),
      validate: {
        isIn: {
          args: [['public', 'private']],
          msg: 'Quiz must be public or private',
        },
      },
    },
  }, {});
  Quizzes.associate = (models) => {
    // associations can be defined here
    Quizzes.hasMany(models.Questions, { foreignKey: 'quizId' });
  };
  return Quizzes;
};
