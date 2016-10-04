/*global describe, it*/

"use strict";

let UserRepositoryMock = require("../mocks/userRepository");
let UserController = require ("../../libs/controllers/userController");
let AuthenticationService = require ("../../libs/services/authenticationService");
let chai = require("chai");

let expect = chai.expect;
let userRepositoryMock = new UserRepositoryMock();
let userController = new UserController(userRepositoryMock);
let authenticationService = new AuthenticationService(userRepositoryMock);

describe("Service: AuthenticationService", () => {

    describe("Method: authenticate", () => {

        it("Should fail when Token doesn't exist", (done) => {
            let promise = authenticationService.authenticate(1, "INVALID_TOKEN");
            expect(promise).to.not.be.null;
            expect(promise).to.be.instanceof(Promise);

            promise.catch((result) => {
                expect(result).to.be.equal("Not Authorized");
                done();
            });
            
        });

        it("Should fail when last_login is older than 30 mins", (done) => {

            let user = { 
                name: "Test1", 
                email: "test1@test.com", 
                password: "123456", 
                last_login: new Date(2016, 10, 1, 18, 0, 0) 
            };

            userController.create(user).then((createdUser) => {

                let promise = authenticationService.authenticate(createdUser.id, createdUser.id);
                expect(promise).to.not.be.null;
                expect(promise).to.be.instanceof(Promise);

                promise.catch((result) => {
                    expect(result).to.be.equal("Invalid session");
                    done();
                });

            });
            
        });

        it("Should return User when Token and requested User ID are valid", (done) => {

            let user = { name: "Test2", email: "test2@test.com", password: "123456" };
            
            userController.create(user).then((createdUser) => {

                let promise = authenticationService.authenticate(createdUser.id, createdUser.id);
                expect(promise).to.not.be.null;
                expect(promise).to.be.instanceof(Promise);

                promise.then((foundUSer) => {
                    expect(foundUSer.name).to.be.equal(user.name);
                    done();
                });

            });
            
        });

    });

});