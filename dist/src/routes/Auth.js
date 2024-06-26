"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dash = exports.Authstatus = exports.logOut = exports.verifyotp = exports.login = exports.register = exports.Authrout = void 0;
const express_1 = __importDefault(require("express"));
const Auth_register_1 = require("../controllers/Auth/Auth.register");
const jwtVerification_1 = require("../middlewwares/jwtVerification");
const dashoard_1 = require("../controllers/Auth/dashoard");
const AuthStatus_1 = require("../controllers/Auth/AuthStatus");
const Auth_logout_1 = require("../controllers/Auth/Auth.logout");
const rateLimiter_middleware_1 = require("../middlewwares/rateLimiter.middleware");
const Auth_logIn_1 = require("../controllers/Auth/Auth.logIn");
exports.Authrout = express_1.default.Router();
exports.register = exports.Authrout.post('/register', Auth_register_1.signUp);
exports.login = exports.Authrout.post('/login', rateLimiter_middleware_1.loginLimiter, Auth_logIn_1.logIn);
exports.verifyotp = exports.Authrout.post('/verifyOtp', Auth_logIn_1.verifyOtp);
exports.logOut = exports.Authrout.get('/logout', Auth_logout_1.logout);
exports.Authstatus = exports.Authrout.get('/status', AuthStatus_1.status);
exports.dash = exports.Authrout.get('/dash', jwtVerification_1.verifyJwt, dashoard_1.dashIn);
