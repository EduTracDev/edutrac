import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import type { CloudinaryUploadResult } from 'src/core/types/cloudinary.types';

@Injectable()
export class CloudinaryService {
    constructor(
        @Inject('CLOUDINARY')
        private readonly cloudinary: typeof Cloudinary,
    ) {}

    async uploadImage(file: Express.Multer.File): Promise<CloudinaryUploadResult> {
        if (!file) {
            throw new BadRequestException('No file uploaded.');
        }

        return new Promise((resolve, reject) => {
            const uploadStream = this.cloudinary.uploader.upload_stream({
                folder: 'edutrac/onboarding',
                resource_type: 'image',
                overwrite: false,
                unique_filename: true,
            },
            (error, result) => {
                if (error) return reject(error);
                if (!result) return reject(new BadRequestException('Cloudinary upload failed.'));
                
                resolve({url: result.secure_url, publicId: result.public_id});
            })
            Readable.from(file.buffer).pipe(uploadStream);
        })
    }

    async deleteImage(publicId: string) {
        await this.cloudinary.uploader.destroy(publicId);
    }
}