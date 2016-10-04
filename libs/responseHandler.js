"use strict";

let BaseResponse = require("./responses/baseResponse");

module.exports = (result, res) => {

    if (result instanceof BaseResponse)
        return res.status(result.httpStatusCode).json({ message: result.message });
    
    if (result instanceof Promise || (result && result.then))
        return result.then((data) => res.status(200).json(data)).catch((err) => res.status(500).json(err));
        
    return res.json(result);

}