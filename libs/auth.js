"use strict";

let passport = require("passport");
let JwtBearerStrategy = require("passport-http-jwt-bearer");
let UserRepository = require("./repositories/userRepository");
let AuthenticationService = require("./services/authenticationService");
let config = require("../config");

module.exports = (db) => {

    const authenticationService = new AuthenticationService(new UserRepository(db));
    const strategy = new JwtBearerStrategy(config.jwtSecret, { passReqToCallback: true }, (req, token, done) => {

        authenticationService.authenticate(token.userId, req.params.id).then((user) => {
            if (user) 
                return done(null, { id: user.id });
            return done(null, false);
        })
        .catch(done);
    
    });

    passport.use(strategy);

    return {
        init: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt-bearer", { session: false });
        }
    };
};