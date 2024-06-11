"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const CustomError_1 = require("../utils/CustomError");
class NotFoundError extends CustomError_1.CustomeError {
    constructor(message, statusCode) {
        super(message, statusCode);
        this.message = message;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serialize() {
        return { message: this.message };
    }
}
exports.NotFoundError = NotFoundError;
