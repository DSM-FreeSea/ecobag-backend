import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET,
        acl: 'public-read',
        key: function (req, file, cb) {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFiles() files: Express.MulterS3.File[]) {
    return this.imagesService.uploadImage(files);
  }
}
