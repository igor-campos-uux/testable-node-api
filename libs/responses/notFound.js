"use strict";

let BaseResponse = require("./baseResponse"); 

module.exports = class NotFound extends BaseResponse {
    constructor (message) {
        super(404, message);
    }
}