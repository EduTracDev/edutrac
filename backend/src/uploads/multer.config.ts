import { BadRequestException } from '@nestjs/common';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';


const isProduction = process.env.NODE_ENV === 'production';
export const multerOptions = {
    storage: isProduction ? memoryStorage() : diskStorage({
        destination: './uploads/onboarding',

        filename(req, file, cb){
            const fileName = `${randomUUID()}${extname(file.originalname)}`;
            cb(null, fileName);
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter(req, file, cb){
        if (!file.mimetype.startsWith('image/')){
            return cb(new BadRequestException('Only images are allowed'), false);
        }
        cb(null, true)
    }

}