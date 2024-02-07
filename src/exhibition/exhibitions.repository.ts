import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Exhibition } from './dto/exhibition.entity';
import { CreateExhibitionDto } from './dto/create-exhibition.dto';

@Injectable()
export class ExhibitionsRepository extends Repository<Exhibition> {
  constructor(private dataSource: DataSource) {
    super(Exhibition, dataSource.createEntityManager());
  }

  // Get All Exhibitions
  async getAllExhibitions(): Promise<Exhibition[]> {
    const query = this.createQueryBuilder('exhibition');

    const exhibitions = await query.getMany();
    return exhibitions;
  }

  // Get Exhibition by ID
  async getExhibitionById(id: string): Promise<Exhibition> {
    const exhibition = await this.findOne({
      where: { id },
    });

    if (!exhibition) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return exhibition;
  }

  // Create Exhibition
  async createExhibition(
    createExhibitionDto: CreateExhibitionDto,
  ): Promise<Exhibition> {
    const exhibition = this.create({
      ...createExhibitionDto,
    });

    await this.save(exhibition);

    return exhibition;
  }

  // Update Exhibition
  async updateExhibition(
    id: string,
    title: string,
    exhibitionImage: string,
    exhibitionDescription: string,
    exhibitionDate: string,
  ): Promise<Exhibition> {
    const exhibition = await this.getExhibitionById(id);

    if (title) {
      exhibition.title = title;
    }
    if (exhibitionImage) {
      exhibition.exhibitionImage = exhibitionImage;
    }
    if (exhibitionDescription) {
      exhibition.exhibitionDescription = exhibitionDescription;
    }
    if (exhibitionDate) {
      exhibition.exhibitionDate = exhibitionDate;
    }

    await this.save(exhibition);

    return exhibition;
  }

  // Delete Exhibition
  async deleteExhibition(id: string): Promise<void> {
    const result = await this.delete(id);

    if (result.affected) {
      throw new NotFoundException(`Exhibition with ID "${id}" not found`);
    }
  }
}
