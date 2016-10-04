"use strict";

let BaseResponse = require("./baseResponse"); 

module.exports = class NotAuthorized extends BaseResponse {
    constructor (message) {
        super(401, message);
    }
}