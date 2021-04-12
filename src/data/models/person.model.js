import { DataTypes, Sequelize } from 'sequelize';

const personModel = (sequelize) => {
  const Person = sequelize.define(
    'Person',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 100],
        },
      },
      firstname: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 100],
        },
      },
      lastname: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 100],
        },
      },
      lastLogin: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
          isDate: true,
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
  Person.associate = (models) => {
    Person.hasMany(models.Todo, {
      foreignKey: { name: 'assignee', allowNull: false },
      as: 'todos',
    });
  };
};

export { personModel };
