import { Injectable } from '@nestjs/common';
import { WorkRepository } from './repository/work.repository';
import { Work } from './entity/works.entity';
import { CreateWorkDto } from './dto/create-work.dto';

@Injectable()
export class WorkService {
  constructor(private workRepository: WorkRepository) {}

  getAllWorks(): Promise<Work[]> {
    return this.workRepository.getAllWorks();
  }

  createWork(artistId: string, createWorkDto: CreateWorkDto): Promise<Work> {
    return this.workRepository.createWork(artistId, createWorkDto);
  }

  uploadArtistWorkImage(
    id: string,
    fileName: string,
    file: Buffer,
  ): Promise<void> {
    return this.workRepository.uploadArtistWorkImage(id, fileName, file);
  }

  uploadWorkImage(id: string, fileName: string, file: Buffer): Promise<void> {
    return this.workRepository.uploadWorkImage(id, fileName, file);
  }

  uploadImageOne(id: string, fileName: string, file: Buffer): Promise<void> {
    return this.workRepository.uploadImageOne(id, fileName, file);
  }

  uploadImageTwo(id: string, fileName: string, file: Buffer): Promise<void> {
    return this.workRepository.uploadImageTwo(id, fileName, file);
  }

  uploadImageThree(id: string, fileName: string, file: Buffer): Promise<void> {
    return this.workRepository.uploadImageThree(id, fileName, file);
  }

  deleteWork(id: string): Promise<void> {
    return this.workRepository.deleteWork(id);
  }
}
