"use strict";

module.exports = class BaseResponse {

    constructor (httpStatusCode, message) {
        this.httpStatusCode = httpStatusCode;
        this.message = message;
    }

}