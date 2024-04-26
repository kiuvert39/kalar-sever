
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
    token:{
        type: DataTypes.STRING,
        defaultValue: null
    },isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false 
    }
}, {
    tableName: 'users',
    timestamps: true,
  
});

User.sync()
.then(() =>{
  console.log('user model sync to database');
})
.catch((err: string)=>{
  console.log('error occured syncing user model');
})


