import { DataTypes, Sequelize } from 'sequelize';
import { commentStatusChoices } from 'server/utils/constants/fieldChoices';

const commentModel = (sequelize) => {
  const Comment = sequelize.define(
    'Comment',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      message: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 512],
        },
      },
      submitted: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
          isDate: true,
        },
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          isIn: [commentStatusChoices],
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
  Comment.associate = (models) => {
    Comment.belongsTo(models.Todo, { foreignKey: { name: 'todo', allowNull: false }, as: 'todo_' });
  };
};

export { commentModel };
