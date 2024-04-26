import { Request,  Response,NextFunction} from "express"
import { Products } from "../../models/products"
import { v2 as cloudinary } from 'cloudinary'
import  {categorys}  from "../../models/Category";




export default  cloudinary.config({
    cloud_name: "dczzafdcx",
    api_key: "186811237139555",
    api_secret: "DnI7ftTrtim0m0JJ7ZsJl37Bs8s"
});

export async function uploadImage(imagePath: string): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    return result.secure_url;
  } catch (error:any) {
    throw new Error(`Error uploading image to Cloudinary: ${error.message}`);
  }
}


export  const createProductController = async (req:Request,  res:Response,   next:NextFunction) =>{
  const {Name, Description,Brand,Price,Quantity,category}  =req.body 
  const files = req.files as Express.Multer.File[]; 
  
try{  
  if (!Name || !Description || !Brand || !Price || !Quantity || !category || !files) {
    return res.status(400).json({ error: "Required field is missing." });
  } 
  const imageUrls: string[] = [];

  for (const file of files) {
    const imageUrl = await uploadImage(file.path); 
    imageUrls.push(imageUrl);
  }

  const [catego, created] = await categorys.findOrCreate({   
    where: {
      categoryName: category
  }
  });


const categoryId = catego.get('categoryId');

 const products=await Products.create({
    Name,
    Description,
    Brand,
    Price,
    Quantity,
    categoryId:categoryId,
    Images: imageUrls 
  })
  return res.status(200).json({ message: "Product registered  successfully",products })
}
 catch(error){
      next(error)
      console.log(error);
      
    }

}
