"use strict";

let BaseResponse = require("./baseResponse"); 

module.exports = class BadRequest extends BaseResponse {
    constructor (message) {
        super(400, message);
    }
}