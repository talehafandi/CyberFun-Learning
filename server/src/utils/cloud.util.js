import { ApiError } from './../error/ApiError.js';
import { v2 as cloudinary } from "cloudinary"
import config from '../config.js'
import { unlink } from 'node:fs';
import fs from 'fs'

cloudinary.config({
  cloud_name: config.cloud.name,
  api_key: config.cloud.key,
  api_secret: config.cloud.secret,
  secure: true,
});

//TODO: Code is ugly, needs refactoring

const upload = async (filePath) => {
  try {    
    const result = await cloudinary.uploader.upload(filePath)
    if(result.error) throw new ApiError('Something went wrong', 500)

    clearLocal(filePath)

    const asset = {
      url: result.url,
      public_id: result.public_id
    }

    return asset
  } catch (error) {
    console.log("cloudinary error: ", error)
    throw new ApiError('ERROR', 500)
  }
}

// to delete images from local after uploading them to cloud
const clearLocal = (path) => {
  unlink(path, (err) => {
    if (err) {
      console.log("UNLINK ERROR: ", err)
      throw new ApiError('Something went wrong', 500)
    };
  })
}

const destroy = async (id) => {
  try {
    const response = await cloudinary.uploader.destroy(id)
  
    if (response.result !== 'ok') throw new ApiError('ASSET_CANNOT_BE_DELETED', 500)
  
    return true
  } catch (error) {
    console.log("cloudinary error: ", error)
    throw new ApiError('ERROR', 500)
  }
}

export default {
  upload,
  destroy
}