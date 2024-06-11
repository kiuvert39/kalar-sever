"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomeError = void 0;
class CustomeError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode;
    }
}
exports.CustomeError = CustomeError;
