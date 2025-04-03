/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';

// Configuration
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

interface UploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

export const uploadImage = async (
  path: string,
  fileName: string,
): Promise<UploadResult | null> => {
  try {
    const uploadResult = await cloudinary.uploader.upload(path, {
      public_id: fileName,
    });

    // Delete the file after successful upload
    fs.unlink(path, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully!');
      }
    });

    return uploadResult;
  } catch (error) {
    console.error('Upload Error:', error);
    return null;
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
