import { Request, Response, NextFunction } from "express";
import { Products } from "../../models/products";



export const getProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 try{
    console.log('regin  the body ',req.params);
    
    const productId = req.params.id;
    
    // Check if ID is provided
    if (!productId) {
      return res.status(400).json({ error: 'No product ID provided' });
    }

    // if (!uuidValidate(productId)) {
    //   return res.status(400).json({ error: 'Invalid product ID format' });
    // }

    const product = await Products.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
   
    return res.status(200).json(product);

 } 
   catch (error) {
    next(error);
    res.status(500).json({ error: 'Failed to fetch product' });
   }
};
