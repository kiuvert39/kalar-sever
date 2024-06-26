
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConnection';

export const User = sequelize.define('test', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 255]
        }
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false 
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'users',
    timestamps: true,
  
});

User.sync({ alter: true })
.then(() =>{
  console.log('user model sync to database');
})
.catch((err: string)=>{
  console.log('error occured syncing user model');
})


