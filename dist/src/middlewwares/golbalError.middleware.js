"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.golbalerror = void 0;
const CustomError_1 = require("../utils/CustomError");
;
const golbalerror = (error, req, res, next) => {
    if (error instanceof CustomError_1.CustomeError) {
        return res.status(error.statusCode).json({ message: error.serialize() });
    }
    return res.status(400).json({ message: "something went wrong" });
};
exports.golbalerror = golbalerror;
