import { Module } from '@nestjs/common';
import { ExhibitionController } from './exhibition.controller';
import { ExhibitionService } from './exhibition.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibition } from './dto/exhibition.entity';
import { ExhibitionsRepository } from './exhibitions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Exhibition])],
  controllers: [ExhibitionController],
  providers: [ExhibitionService, ExhibitionsRepository],
})
export class ExhibitionModule {}
