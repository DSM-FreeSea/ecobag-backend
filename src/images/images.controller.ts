import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async uploadImage(@UploadedFiles() files: Express.MulterS3.File[]) {
    return this.imagesService.uploadImage(files, 'upload');
  }
}
