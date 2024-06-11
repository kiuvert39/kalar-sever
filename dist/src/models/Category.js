"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorys = void 0;
const dbConnection_1 = require("../database/dbConnection");
const sequelize_1 = require("sequelize");
exports.categorys = dbConnection_1.sequelize.define("category", {
    categoryId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    categoryName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'category',
    timestamps: true,
});
exports.categorys.sync({ alter: true })
    .then(() => {
    console.log('category model sync to database');
})
    .catch((err) => {
    console.log('error occured syncing category model');
});
