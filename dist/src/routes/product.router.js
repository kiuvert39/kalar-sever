"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_productsByID = exports.get_products = exports.new_product = exports.productrout = void 0;
const express_1 = __importDefault(require("express"));
const newProduct_controller_1 = require("../controllers/productsController/newProduct.controller");
const jwtVerification_1 = require("../middlewwares/jwtVerification");
const multer_1 = __importDefault(require("multer"));
const getProducts_1 = require("../controllers/productsController/getProducts");
const productDetail_1 = require("../controllers/productsController/productDetail");
const upload = (0, multer_1.default)({ dest: 'uploads/' });
exports.productrout = express_1.default.Router();
exports.new_product = exports.productrout.post("/register_product", jwtVerification_1.verifyJwt, upload.array('Images', 4), newProduct_controller_1.createProductController);
exports.get_products = exports.productrout.get("/get-all_products", getProducts_1.getProductController);
exports.get_productsByID = exports.productrout.get("/:id?", productDetail_1.getProductByIdController);
