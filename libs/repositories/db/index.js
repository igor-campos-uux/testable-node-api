"use strict";

let Sequelize = require("sequelize");

module.exports = () => {
    
    const sequelize = new Sequelize(
        "db", 
        "", 
        "",
        {
            dialect: "sqlite",
            storage: "db.sqlite",
            define: {
                underscored: true
            }
        });

    return {
        sequelize,
        Sequelize,
        models: {
            Users: sequelize.import("./models/user"),
            PhoneNumbers: sequelize.import("./models/phoneNumber")
        }
    };
    
};