"use strict";

let BaseResponse = require("./baseResponse"); 

module.exports = class InternalServerError extends BaseResponse {
    constructor (message) {
        super(500, message);
    }
}