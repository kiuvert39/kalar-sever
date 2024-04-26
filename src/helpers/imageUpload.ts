import { v2 as cloudinary } from 'cloudinary'


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
      throw new Error(`Error uploading image to Cloudinary: ${error}`);
    }
  }