module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define('Questions', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: { args: 4, msg: 'ID not valid, please try again' },
      },
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [3, 500], msg: 'Question title is required' },
      },
    },
  }, {});
  Questions.associate = (models) => {
    // associations can be defined here
    Questions.belongsTo(models.Quizzes, { foreignKey: 'quizId' });
    Questions.hasMany(models.Choices, { foreignKey: 'questionId' });
  };
  return Questions;
};
