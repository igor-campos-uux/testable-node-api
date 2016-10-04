"use strict";

let BaseController = require("./baseController");
let config = require("../../config");
let jwt = require("jwt-simple");
let bcrypt = require("bcrypt-nodejs");

module.exports = class UserController extends BaseController {

    constructor (userRepository) {
        super();
        this.userRepository = userRepository;
    }

    create (user) {

        let locals = {};

        if (!user)
            return this.badRequest("Invalid user in request body.");

        return this.userRepository.list({ email: user.email }).then((foundUsers) => {

            if (foundUsers.length)
                return this.badRequest("E-mail already registered.");
            
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
            return this.userRepository.create(user);

        })
        .then((createdUser) => {
            locals.createdUser = createdUser;
            createdUser.token = jwt.encode({ userId: createdUser.id }, config.jwtSecret);
            return this.userRepository.update(createdUser);
        })
        .then((updated) => { return locals.createdUser; })
        .catch((err) => { return this.internalServerError(err); });

    }

    signIn (email, password) {

        return this.userRepository.list({ email: email }).then((foundUsers) => {

            if (!foundUsers.length)
                return this.notFound("User not found by provided e-mail: " + email);

            let user = foundUsers[0];
            let isPasswordValid = bcrypt.compareSync(password, user.password);

            if (!isPasswordValid)
                return this.notAuthorized("The provided password is invalid.");

            user.last_login = new Date();
            return this.userRepository.update(user).then((updatedUser) => {
                return user;
            })
            .catch(this.internalServerError);

        })
        .catch(this.internalServerError);
    }

    list () {
        return this.userRepository.list();
    }

    find (id) {
        return this.userRepository.find(id);
    }

}