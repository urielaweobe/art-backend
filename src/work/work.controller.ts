import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { WorkService } from './work.service';
import { Work } from './entity/works.entity';
import { CreateWorkDto } from './dto/create-work.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('work')
export class WorkController {
  constructor(private workService: WorkService) {}

  // Get all works
  @Get()
  getWorks(): Promise<Work[]> {
    return this.workService.getAllWorks();
  }

  // Create work
  @Post('/:artistId/create')
  createWork(
    @Param('artistId') artistId: string,
    @Body() createWorkDto: CreateWorkDto,
  ): Promise<Work> {
    return this.workService.createWork(artistId, createWorkDto);
  }

  // upload artist work image
  @Post('/:id/upload-artist-work-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadArtistWorkImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<void> {
    await this.workService.uploadArtistWorkImage(
      id,
      file.originalname,
      file.buffer,
    );
  }

  // upload work image
  @Post('/:id/upload-work-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadWorkImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<void> {
    await this.workService.uploadWorkImage(id, file.originalname, file.buffer);
  }

  // upload image one
  @Post('/:id/upload-image-one')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImageOne(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<void> {
    await this.workService.uploadImageOne(id, file.originalname, file.buffer);
  }

  // upload image two
  @Post('/:id/upload-image-two')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImageTwo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<void> {
    await this.workService.uploadImageTwo(id, file.originalname, file.buffer);
  }

  // upload image three
  @Post('/:id/upload-image-three')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImageThree(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<void> {
    await this.workService.uploadImageThree(id, file.originalname, file.buffer);
  }

  // Delete work
  @Delete('/:id')
  deleteWork(@Param('id') id: string): Promise<void> {
    return this.workService.deleteWork(id);
  }
}
