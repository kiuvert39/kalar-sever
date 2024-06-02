import express from 'express'
import { createProductController } from '../controllers/productsController/newProduct.controller'
import { verifyJwt } from '../middlewwares/jwtVerification'
import multer from 'multer';
import { getProductController } from '../controllers/productsController/getProducts';
import { getProductByIdController } from '../controllers/productsController/productDetail';

const upload  =multer({ dest: 'uploads/' });


export const productrout = express.Router()

export const new_product = productrout.post("/register_product",verifyJwt,upload.array('Images', 4), createProductController)
export const get_products = productrout.get("/get-all_products",getProductController)
export const get_productsByID = productrout.get("/:id?",getProductByIdController)
