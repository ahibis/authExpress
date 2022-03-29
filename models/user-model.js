const { DataTypes } = require("sequelize");
const sequelize = require("../service/bd-service");
const Users = sequelize.define(
  "user",
  {
    email: {
      type: DataTypes.STRING(20),
      validate: {
        isEmail: true,
        len: [5, 20],
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    token:{
      type: DataTypes.STRING,
      default:""
    }
  },
  {}
);
sequelize.sync({ alter: true });
module.exports = Users;
