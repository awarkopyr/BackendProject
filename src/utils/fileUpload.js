import { v2 as cloudinary } from "cloudinary"
import { response } from "express";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.FILE_CLOUD_NAME,
    api_key: process.env.FILE_CLOUD_KEY,
    api_secret: process.env.FILE_CLOUD_SECRET
});


const fileUpload = async (localPath) => {
    try {
        if(!localPath) return null
        ///upload file///
        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: "auto"
        })
        ///file has been uploded successfully///
        console.log("file has been uploded successfully", response.url);
        fs.unlinkSync(localPath)
        return response;
    } catch (error) {
        fs.unlinkSync(localPath) //remove the locally saved temporary file as the system failed
        return null;
    }
}

export {fileUpload}