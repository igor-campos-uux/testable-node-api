"use strict";

module.exports = class UserRepository {

    constructor (db) {
        this.db = db;
        this.Users = db.models.Users;
    }

    find (id) {
        return this.Users.findById(id);
    }

    create (user) {
        return this.Users.create(user);
    }

    update (user) {
        
        let id = user.id;

        return this.Users.update({ 
            name: user.name, 
            email: user.email, 
            last_login: user.last_login,
            token: user.token 
        }, { where: { id: id } });
    }

    list (filters) {
        return this.Users.findAll({ where: filters });
    }

}