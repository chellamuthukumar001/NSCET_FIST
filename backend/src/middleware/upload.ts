import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsBase = path.join(__dirname, '../../uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'materials';
    if (file.fieldname === 'videoFile') {
      folder = 'videos';
    } else if (file.fieldname === 'thumbnailFile') {
      folder = 'thumbnails';
    }
    const dest = path.join(uploadsBase, folder);
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

export const uploadVideoFiles = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB max
  },
}).fields([
  { name: 'videoFile', maxCount: 1 },
  { name: 'thumbnailFile', maxCount: 1 },
  { name: 'studyMaterialFile', maxCount: 1 },
]);
