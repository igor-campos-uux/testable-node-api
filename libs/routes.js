"use strict";

let UserRepository = require("./repositories/userRepository");
let UserController = require("./controllers/userController");
let ResponseHandler = require("./responseHandler");

module.exports = (app, db, auth) => {

    let userRepository = new UserRepository(db);
    let userController = new UserController(userRepository);

    app.route("/signin")
        .post((req, res) => ResponseHandler(userController.signIn(req.body.email, req.body.password), res));

    app.route("/users")
        .get((req, res) => ResponseHandler(userController.list(), res))
        .post((req, res) => ResponseHandler(userController.create(req.body), res));

    app.route("/users/:id")
        .all(auth.authenticate())
        .get((req, res, some) => { ResponseHandler(userController.find(req.params.id), res); });

}