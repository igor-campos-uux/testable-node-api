"use strict";

let BadRequest = require("../responses/badRequest");
let NotFound = require("../responses/notFound");
let InternalServerError = require("../responses/internalServerError");

module.exports = class BaseController {

    badRequest(message) {
        return new BadRequest(message);
    }

    notFound(message) {
        return new NotFound(message);
    }

    internalServerError(message) {
        return new InternalServerError(message);
    }

}