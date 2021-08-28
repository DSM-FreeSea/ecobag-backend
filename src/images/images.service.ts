import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
  region: process.env.AWS_REGION,
});

@Injectable()
export class ImagesService {
  async uploadImage(files: Express.MulterS3.File[]) {
    return { uploaded: true, url: files.map((v) => v.location) };
  }
}
