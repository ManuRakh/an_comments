const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequilize.db.js");

const Comments = sequelize.define(
  "comments",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(50000),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    request_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_ids: {
      type: DataTypes.STRING, // Определите столбец как массив строк
      allowNull: false,
      defaultValue: "[]", // Установите значение по умолчанию как пустой массив
    },
    academy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deletedAt: {
        type: DataTypes.DATE,
    }
  },
  {
    timestamps: true,
    tableName: "comments",
  },
);

module.exports = Comments;
