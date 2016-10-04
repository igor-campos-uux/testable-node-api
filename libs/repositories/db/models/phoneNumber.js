"use strict";

module.exports = (sequelize, DataType) => {

    const PhoneNumbers = sequelize.define("PhoneNumbers", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataType.INTEGER
        },
        area_code: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        number: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
    
    return PhoneNumbers;

};