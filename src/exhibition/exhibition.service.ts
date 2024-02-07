import { Injectable } from '@nestjs/common';
import { CreateExhibitionDto } from './dto/create-exhibition.dto';
import { ExhibitionsRepository } from './exhibitions.repository';
import { Exhibition } from './dto/exhibition.entity';

@Injectable()
export class ExhibitionService {
  constructor(private exhibitionsRepository: ExhibitionsRepository) {}

  getAllExhibitions(): Promise<Exhibition[]> {
    return this.exhibitionsRepository.getAllExhibitions();
  }

  getExhibitionById(id: string): Promise<Exhibition> {
    return this.exhibitionsRepository.getExhibitionById(id);
  }

  createExhibition(
    createExhibitionDto: CreateExhibitionDto,
  ): Promise<Exhibition> {
    return this.exhibitionsRepository.createExhibition(createExhibitionDto);
  }

  deleteExchibition(id: string): Promise<void> {
    return this.exhibitionsRepository.deleteExhibition(id);
  }

  updateExhibition(
    id: string,
    title: string,
    exhibitionImage: string,
    exhibitionDescription: string,
    exhibitionDate: string,
  ) {
    return this.exhibitionsRepository.updateExhibition(
      id,
      title,
      exhibitionDate,
      exhibitionDescription,
      exhibitionImage,
    );
  }
}
