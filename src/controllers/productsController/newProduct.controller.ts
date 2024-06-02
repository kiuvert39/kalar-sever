import { Request, Response, NextFunction } from "express";
import { Products } from "../../models/products";
import { v2 as cloudinary } from "cloudinary";
import { categorys } from "../../models/Category";
import { User } from "../../models/user";
import { Op } from "sequelize";

export default  cloudinary.config({
  cloud_name: "dczzafdcx",
  api_key: "186811237139555",
  api_secret: "DnI7ftTrtim0m0JJ7ZsJl37Bs8s"
});

export async function uploadImage(imagePath: string): Promise<string> {
try {
  const result = await cloudinary.uploader.upload(imagePath,{
    transformation: [
     
      { effect: 'bgremoval' }                   // Remove background
    ]
  });
  return result.secure_url;
} catch (error:any) {
  console.log(error);
  
  throw new Error(`Error uploading image to Cloudinary: ${error.message}`);
}
};

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { Name, Description, Brand, Price, Quantity, category } = req.body;
  const files = req.files as Express.Multer.File[];
  const userId = req.id;
  console.log("userid", req.id);

  
  cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });
   try {
     if (
       !Name ||
       !Description ||
       !Brand ||
       !Price ||
       !Quantity ||
       !category ||
       !files
     ) {
       return res.status(400).json({ error: "Required field is missing." });
     }

     const user = await User.findByPk(userId);

     if (!user) {
       return res.status(404).json({ error: "User not found" });
     }

    // Check if the user is an admin
     const isAdmin = user.get("isAdmin") as boolean; // Access isAdmin property
     if (!isAdmin) {
       return res
         .status(403)
        .json({ error: "Access denied. Only admin users are allowed." });
    }

   const imageUrls: string[] = [];

   for (const file of files) {
     const imageUrl = await uploadImage(file.path);
     imageUrls.push(imageUrl);
   }

    const [catego, created] = await categorys.findOrCreate({
       where: {
         categoryName: category,
       },
     });

     const categoryId = catego.get("categoryId");

     const products = await Products.create({
       Name,
       Description,
       Brand,
       Price,
       Quantity,
       categoryId: categoryId,
       Images: imageUrls,
       UserId: userId,
     });
     return res
       .status(200)
       .json({ message: "Product registered  successfully", products });
   } catch (error) {
    next(error);
    console.log(error);
   }
};
