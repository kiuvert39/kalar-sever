import express from 'express'
import { createProductController } from '../controllers/productsController/newProduct.controller'
import { verifyJwt } from '../middlewwares/jwtVerification'
import multer from 'multer';

const upload  =multer({ dest: 'uploads/' });


export const productrout = express.Router()

export const new_product = productrout.post("/register_product",verifyJwt,upload.array('Images', 4), createProductController)