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
exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
exports.default = cloudinary_1.v2.config({
    cloud_name: "dczzafdcx",
    api_key: "186811237139555",
    api_secret: "DnI7ftTrtim0m0JJ7ZsJl37Bs8s"
});
function uploadImage(imagePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield cloudinary_1.v2.uploader.upload(imagePath);
            return result.secure_url;
        }
        catch (error) {
            throw new Error(`Error uploading image to Cloudinary: ${error}`);
        }
    });
}
exports.uploadImage = uploadImage;
