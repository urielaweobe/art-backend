import {
  Body,
  Controller,
  Delete,
  // FileTypeValidator,
  Get,
  // MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { Work } from './entities/works.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('artists')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  // Get all artists
  @Get()
  getArtists(): Promise<Artist[]> {
    return this.artistsService.getAllArtist();
  }

  // Get an artist with ID
  @Get('/:id')
  getArtistById(@Param('id') id: string): Promise<Artist> {
    return this.artistsService.getArtistById(id);
  }

  // Create an artist
  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistsService.createArtist(createArtistDto);
  }

  // upload artist profile picture
  @Post('/:id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
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
    await this.artistsService.uploadArtistProfilePicture(
      id,
      file.originalname,
      file.buffer,
    );
  }

  // Update artist details
  @Patch('/:id/update')
  updateArtist(
    @Param('id') id: string,
    @Body('artistName') artistName: string,
    @Body('biography') biography: string,
    @Body('work') work: Work[],
  ): Promise<Artist> {
    return this.artistsService.updateArtist(id, artistName, biography, work);
  }

  // Delete an artist
  @Delete('/:id/delete')
  deleteArtist(@Param('id') id: string): Promise<void> {
    return this.artistsService.deleteArtist(id);
  }

  // This get is for getting available works
  // @Get()
  // getAllWorks(): Promise<Work[]> {
  //   return this.artistsService.getAllWorks();
  // }

  @Post('/:id/upload-work-image')
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
    await this.artistsService.uploadArtistWorkImage(
      id,
      file.originalname,
      file.buffer,
    );
  }
}
