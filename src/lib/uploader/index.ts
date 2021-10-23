import multer from 'multer';
import { Request } from 'express';
import path from 'path';
import { IObjectKeys } from '../../types/general';
import { Error } from 'mongoose';

const limits = { fileSize: 1024 * 1024 * 5 };

const fileFilter = (req: Request, file: any, cb: any) => {
  const validationSet: string[] = [
    '.jpg',
    '.JPG',
    '.jpeg',
    '.JPEG',
    '.png',
    '.PNG',
  ];

  const isValid = validationSet.includes(path.extname(file.originalname));
  const error = isValid ? null : new Error('Invalid mime type');
  return cb(error, isValid);
};

const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const uploading = multer({ storage: localStorage, limits, fileFilter }).single(
  'file'
);

/**
 * uploader
 */
const uploader = (req: any, res: any): Promise<IObjectKeys> =>
  new Promise((resolve, reject) => {
    uploading(req, res, function (error: multer.MulterError | any) {
      if ((error && error instanceof multer.MulterError) || error?.message)
        reject(new Error(error.message));

      // handle unknown error
      if (error) reject(new Error('Upload failed'));

      resolve({
        filePath: req?.file?.location
          ? (req?.file?.location as string)
          : (req?.file?.path as string),
        fileName: req?.file?.key
          ? (req?.file?.key as string)
          : (req?.file?.filename as string),
        ...req.body,
      });
    });
  });

export default uploader;
