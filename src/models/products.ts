import { DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConnection';
import { User } from './user';
import { categorys } from './Category';

export const Products =
    sequelize.define('Product', {
        productId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        Description: {
            type: DataTypes.TEXT, 
            allowNull: false,
            validate: {
                notEmpty: true, 
            }
        },
        categoryId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'category',
                key: 'categoryId'
            }
        },
        Brand: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true, 
            }
        },
        Price: {
            type: DataTypes.FLOAT, 
            allowNull: false,
            validate: {
                min: 0, 
            }
        },
        Quantity: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            validate: {
                min: 0, 
            }
        },
        Images: {
            type: DataTypes.ARRAY(DataTypes.STRING), 
            allowNull: false,
            validate: {
                notEmpty: true, 
            }
        },
        UserId: {
            type: DataTypes.UUID, // Assuming user IDs are UUIDs
            allowNull: false,
            references: {
                model: 'users', // Name of the user model
                key: 'id'       // Name of the user ID field
            }
        },
        testId:{
            type: DataTypes.STRING
        }

},{
    tableName: 'products',
    timestamps: true,
  
})


Products.sync({ alter: true })
.then(() =>{
  console.log('products model sync to database');
})
.catch((err: string)=>{
  console.log('error occured syncing product model',err)
})

//  relationships
User.hasMany(Products)
Products.belongsTo(User)
Products.belongsTo(categorys, { foreignKey: 'categoryId' });
