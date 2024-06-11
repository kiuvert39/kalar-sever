"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dbConnection_1 = require("./src/database/dbConnection");
const Auth_1 = require("./src/routes/Auth");
require("express-async-errors");
const NotFoundErrors_1 = require("./src/errors/NotFoundErrors");
const product_router_1 = require("./src/routes/product.router");
const Auth_register_1 = require("./src/controllers/Auth/Auth.register");
(0, dbConnection_1.dbConnection)();
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT, 10);
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://kalartech.netlify.app", "https://deploy-preview-23--kalartech.netlify.app", "https://kalar.vercel.app"],
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/auth/', Auth_1.register);
app.get('/verify-email', Auth_register_1.verifyEmail);
app.use('/api/auth/', Auth_1.login);
app.use('/api/auth/', Auth_1.logOut);
app.use('/api/auth/', Auth_1.Authstatus);
app.use('/api/auth/', Auth_1.dash);
app.use('/api/product', product_router_1.new_product);
app.use('/api/product', product_router_1.get_products);
app.use('/api/product/', product_router_1.get_productsByID);
app.all('*', (req, res, next) => {
    throw new NotFoundErrors_1.NotFoundError('Resource not Found', 404);
});
function errorHandler(err, req, res, next) {
    console.error('Global Error Handler:', err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: {
            message: err.message || 'Internal Server Error'
        }
    });
}
app.use(errorHandler);
app.listen(PORT, () => { console.log(`Listening at port ${PORT}`); });
