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
exports.createProductController = exports.uploadImage = void 0;
const products_1 = require("../../models/products");
const cloudinary_1 = require("cloudinary");
const Category_1 = require("../../models/Category");
const user_1 = require("../../models/user");
exports.default = cloudinary_1.v2.config({
    cloud_name: "dczzafdcx",
    api_key: "186811237139555",
    api_secret: "DnI7ftTrtim0m0JJ7ZsJl37Bs8s"
});
function uploadImage(imagePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield cloudinary_1.v2.uploader.upload(imagePath, {
                transformation: [
                    { effect: 'bgremoval' } // Remove background
                ]
            });
            return result.secure_url;
        }
        catch (error) {
            console.log(error);
            throw new Error(`Error uploading image to Cloudinary: ${error.message}`);
        }
    });
}
exports.uploadImage = uploadImage;
;
const createProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Name, Description, Brand, Price, Quantity, category } = req.body;
    const files = req.files;
    const userId = req.id;
    console.log("userid", req.id);
    cloudinary_1.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg", { public_id: "olympic_flag" }, function (error, result) { console.log(result); });
    try {
        if (!Name ||
            !Description ||
            !Brand ||
            !Price ||
            !Quantity ||
            !category ||
            !files) {
            return res.status(400).json({ error: "Required field is missing." });
        }
        const user = yield user_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Check if the user is an admin
        const isAdmin = user.get("isAdmin"); // Access isAdmin property
        if (!isAdmin) {
            return res
                .status(403)
                .json({ error: "Access denied. Only admin users are allowed." });
        }
        const imageUrls = [];
        for (const file of files) {
            const imageUrl = yield uploadImage(file.path);
            imageUrls.push(imageUrl);
        }
        const [catego, created] = yield Category_1.categorys.findOrCreate({
            where: {
                categoryName: category,
            },
        });
        const categoryId = catego.get("categoryId");
        const products = yield products_1.Products.create({
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
    }
    catch (error) {
        next(error);
        console.log(error);
    }
});
exports.createProductController = createProductController;
