"use strict";

let _ = require("lodash");

module.exports = class UserRepository {

    constructor () {
        this.arr = [];
    }

    find (id) {
        return new Promise((resolve, reject) => {
            resolve(_.filter(this.arr, { id: id })[0]);
        });
    }

    create (user) {

        return new Promise((resolve, reject) => {
            user.id = (this.arr.length || 1);
            this.arr.push(user);
            resolve(user);
        });

    }

    list (filters) {

        return new Promise((resolve, reject) => {
            resolve(_.filter(this.arr, filters));
        });

    }

    update (user) {

        return new Promise((resolve, reject) => {
            for (let i = 0; i < this.arr.length; i++) {
                if (this.arr[i].id == user.id) {
                    this.arr[i] = user;
                    return resolve(this.arr[i]);
                }
            }

            resolve();

        });

    }

}