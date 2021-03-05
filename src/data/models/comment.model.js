import { DataTypes } from 'sequelize';
import { commentStatusChoices } from 'server/utils/constants/fieldChoices';

const commentModel = (sequelize) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    message: {
      type: DataTypes.STRING,
      validate: {
        len: [0,512],
      },
    },
    submitted: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn:  [commentStatusChoices],
      },
    },
  }, {
    freezeTableName: true,
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.Todo,
            { foreignKey: { name: 'todo', allowNull: false },
              as: 'todo_'
            });
  };
};

export { commentModel };

