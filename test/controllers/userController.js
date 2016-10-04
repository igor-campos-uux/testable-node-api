/*global describe, it*/

"use strict";

let UserRepositoryMock = require("../mocks/userRepository");
let UserController = require ("../../libs/controllers/userController");
let BadRequest = require ("../../libs/responses/badRequest");
let NotFound = require ("../../libs/responses/notFound");
let chai = require("chai");
let jwt = require("jwt-simple");
let bcrypt = require("bcrypt-nodejs");
let config = require("../../config");

let expect = chai.expect;
let userRepositoryMock = new UserRepositoryMock();
let userController = new UserController(userRepositoryMock);

describe("Controller: UserController", () => {

    describe("Method: create", () => {

        it("Should return badRequest when sent User is invalid", (done) => {
            let response = userController.create();
            expect(response).to.be.instanceof(BadRequest);
            done();
        });

        it("Should create User", (done) => {
            let user = { name: "Test1", email: "test1@test.com", password: "123456" };
            let promise = userController.create(user);

            expect(promise).to.not.be.null;
            expect(promise).to.be.instanceOf(Promise);
            promise.then((createdUser) => { 
                expect(createdUser.name).to.be.equal(user.name);
                done();
            });
        });

        it("Should create User with encrypted Password and Token (JWT)", (done) => {

            let originalPassword = "123456";
            let promise = userController.create({ name: "Test2", email: "test2@test.com", password: originalPassword });
            
            promise.then((createdUser) => {

                let expectedToken = jwt.encode({ userId: createdUser.id }, config.jwtSecret);
                expect(bcrypt.compareSync(originalPassword, createdUser.password)).to.be.true;
                expect(createdUser.token).to.be.equal(expectedToken);

                done();
            });
        });

        it("Should return badRequest when E-mail already exists", (done) => {
            let user = { name: "Test1", email: "test1@test.com", password: "123456" };
            let promise = userController.create(user);
            promise.then((createdUser) => {
                promise = userController.create(user);
                promise.then((result) => {
                    expect(result).to.be.instanceOf(BadRequest);
                    expect(result.message).to.be.equal("E-mail already registered.");
                    done();
                });
            });
        });

    });

    describe("Method: signIn", () => {

        it("Should return notFound when provided e-mail doesn't exist", (done) => {
            let promise = userController.signIn("notfound@test.com", "123456");
            expect(promise).to.not.be.null;
            expect(promise).to.be.instanceOf(Promise);
            promise.then((result) => { 
                expect(result).to.be.instanceOf(NotFound);
                done();
            });
        });

        it("Should return user with last_sign updated", (done) => {
            let promise = userController.signIn("test1@test.com", "123456");
            expect(promise).to.not.be.null;
            expect(promise).to.be.instanceOf(Promise);
            promise.then((result) => { 
                expect(result.last_login).to.not.be.null;
                done();
            });
        });

    });

});