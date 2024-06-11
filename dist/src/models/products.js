"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("../database/dbConnection");
const user_1 = require("./user");
const Category_1 = require("./Category");
exports.Products = dbConnection_1.sequelize.define('Product', {
    productId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    Name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    Description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    categoryId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'category',
            key: 'categoryId'
        }
    },
    Brand: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    Price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
        }
    },
    Quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        }
    },
    Images: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    UserId: {
        type: sequelize_1.DataTypes.UUID, // Assuming user IDs are UUIDs
        allowNull: false,
        references: {
            model: 'users', // Name of the user model
            key: 'id' // Name of the user ID field
        }
    },
    testId: {
        type: sequelize_1.DataTypes.UUID, // Changed from VARCHAR to UUID
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'products',
    timestamps: true,
});
exports.Products.sync({ alter: true })
    .then(() => {
    console.log('products model sync to database');
})
    .catch((err) => {
    console.log('error occured syncing product model', err);
});
//  relationships
user_1.User.hasMany(exports.Products);
exports.Products.belongsTo(user_1.User, { foreignKey: 'UserId' });
exports.Products.belongsTo(Category_1.categorys, { foreignKey: 'categoryId' });
