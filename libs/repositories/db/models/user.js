"use strict";

module.exports = (sequelize, DataType) => {

    const Users = sequelize.define("Users", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        last_login: {
            type: DataType.DATE,
            allowNull: true
        },
        token: {
            type: DataType.STRING,
            allowNull: true
        }
    });
    
    return Users;

};