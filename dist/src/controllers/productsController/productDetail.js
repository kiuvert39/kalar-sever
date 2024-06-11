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
exports.getProductByIdController = void 0;
const products_1 = require("../../models/products");
const getProductByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('regin  the body ', req.params);
        const productId = req.params.id;
        // Check if ID is provided
        if (!productId) {
            return res.status(400).json({ error: 'No product ID provided' });
        }
        // if (!uuidValidate(productId)) {
        //   return res.status(400).json({ error: 'Invalid product ID format' });
        // }
        const product = yield products_1.Products.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json(product);
    }
    catch (error) {
        next(error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});
exports.getProductByIdController = getProductByIdController;
