import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ImagesService {
  async uploadImage(files: Express.MulterS3.File[], folder: string) {
    const locations = new Array<string>();
    const extCheck = files.map((file) => {
      const ext = extname(file.originalname).toLowerCase();
      const regex = new RegExp(/(jpg)|(png)|(jpeg)/);
      if (!regex.test(ext)) {
        throw new HttpException(
          `This file extension(${ext}) is not supported.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    });
    await Promise.all(extCheck);

    const uploadToS3 = files.map((file) => {
      const bucketS3 = process.env.AWS_S3_BUCKET;
      const filename = uuid();

      locations.push(
        `https://${bucketS3}.s3.${
          process.env.AWS_REGION
        }.amazonaws.com/${folder}/${filename}${extname(
          file.originalname,
        ).toLowerCase()}`,
      );
      return this.uploadS3(file.buffer, `${bucketS3}/${folder}`, filename);
    });
    try {
      await Promise.all(uploadToS3);
    } catch {
      throw new HttpException(
        'An error has occured.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS,
    });
  }
}
