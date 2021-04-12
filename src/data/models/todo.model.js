import { DataTypes, Sequelize } from 'sequelize';

const todoModel = (sequelize) => {
  const Todo = sequelize.define(
    'Todo',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 1024],
        },
      },
      dueDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
          isDate: true,
        },
      },
      done: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      freezeTableName: true,
    }
  );
  Todo.associate = (models) => {
    Todo.hasMany(models.Comment, {
      foreignKey: { name: 'todo', allowNull: false },
      as: 'comments',
    });
    Todo.belongsTo(models.Person, {
      foreignKey: { name: 'assignee', allowNull: false },
      as: 'assignee_',
    });
  };
};

export { todoModel };
