"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthErrors = void 0;
const CustomError_1 = require("../utils/CustomError");
class AuthErrors extends CustomError_1.CustomeError {
    constructor(message, statusCode) {
        super(message, statusCode);
        this.message = message;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, AuthErrors.prototype);
    }
    serialize() {
        return { message: this.message, };
    }
}
exports.AuthErrors = AuthErrors;
