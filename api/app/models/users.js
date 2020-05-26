module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: { args: 4, msg: 'ID not valid, please try again.' },
      },
    },

    username: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'Username is required' },
    },

    email: {
      type: DataTypes.STRING,
      unique: { args: true, msg: 'Email is already in use' },
      allowNull: { args: false, msg: 'Email is required' },
    },

    access_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    type: {
      type: DataTypes.ENUM('github', 'regular'),
      validate: {
        isIn: {
          args: [['github', 'regular']],
          msg: 'User type must be github or regular',
        },
      },
    },
  }, {});

  Users.associate = (models) => {
    // associations can be defined here
    Users.hasMany(models.Quizzes, { foreignKey: 'userId' });
  };

  return Users;
};
