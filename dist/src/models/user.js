"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("../database/dbConnection");
exports.User = dbConnection_1.sequelize.define('test', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    Name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 255]
        }
    },
    isAdmin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'users',
    timestamps: true,
});
exports.User.sync()
    .then(() => {
    console.log('user model sync to database');
})
    .catch((err) => {
    console.log('error occured syncing user model');
});
