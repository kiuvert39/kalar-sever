"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductController = void 0;
const products_1 = require("../../models/products");
const getProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield products_1.Products.findAll();
        res.status(200).json({ message: products });
    }
    catch (error) {
        next(error);
        console.log(error);
    }
});
exports.getProductController = getProductController;
