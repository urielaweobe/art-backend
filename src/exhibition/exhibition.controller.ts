import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ExhibitionService } from './exhibition.service';
import { CreateExhibitionDto } from './dto/create-exhibition.dto';
import { Exhibition } from './dto/exhibition.entity';

@Controller('exhibitions')
export class ExhibitionController {
  constructor(private exhibitionsService: ExhibitionService) {}

  @Get()
  getExhibitions(): Promise<Exhibition[]> {
    return this.exhibitionsService.getAllExhibitions();
  }

  @Get('/:id')
  getExhibitionById(@Param('id') id: string): Promise<Exhibition> {
    return this.exhibitionsService.getExhibitionById(id);
  }

  @Post()
  createExhibition(
    @Body() createExhibitionDto: CreateExhibitionDto,
  ): Promise<Exhibition> {
    return this.exhibitionsService.createExhibition(createExhibitionDto);
  }

  @Delete('/:id')
  deleteExhibition(@Param('id') id: string): Promise<void> {
    return this.exhibitionsService.deleteExchibition(id);
  }

  @Patch('/:id/update-exhibition')
  updateExhibition(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('exhibitionImage') exhibitionImage: string,
    @Body('exhibitionDescription') exhibitionDescription: string,
    @Body('exhibitionDate') exhibitionDate: string,
  ): Promise<Exhibition> {
    return this.exhibitionsService.updateExhibition(
      id,
      title,
      exhibitionImage,
      exhibitionDescription,
      exhibitionDate,
    );
  }
}
