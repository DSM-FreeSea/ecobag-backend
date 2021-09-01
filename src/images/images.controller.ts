import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('post')
  @UseInterceptors(FilesInterceptor('images'))
  async uploadPostImage(@UploadedFiles() files: Express.MulterS3.File[]) {
    return this.imagesService.uploadImages(files, 'upload');
  }

  @Post('profile')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProfileImage(@UploadedFile() file: Express.MulterS3.File) {
    return this.imagesService.uploadImage(file, 'profile');
  }
}
