import { sequelize } from "../database/dbConnection.js";
import { DataTypes } from "sequelize";

export const Users = sequelize.define('User',{
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    Name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
          isEmail: true,
        },
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 255], 
            msg: 'Password must be between 8 and 255 characters long',
          },
        },
    }
})

