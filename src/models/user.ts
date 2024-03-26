
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConnection';
import bcrypt from 'bcrypt'

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
    }
}, {
    tableName: 'users',
    timestamps: false,
    hooks: {
        async beforeCreate(user: any) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            user.password = hashedPassword;
        }
    }
});

User.sync({ alter:true })
.then(() =>{
  console.log('test model sync to database');
})
.catch((err: string)=>{
  console.log('error occured syncing user model')
})


