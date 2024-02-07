import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistsRepository } from './repository/artists.repository';
import { Artist } from './entities/artist.entity';
import { Work } from './entities/works.entity';

@Injectable()
export class ArtistsService {
  constructor(private artistsRepository: ArtistsRepository) {}

  getAllWorks(): Promise<Work[]> {
    return this.artistsRepository.getAllWorks();
  }

  getAllArtist(): Promise<Artist[]> {
    return this.artistsRepository.getAllArtist();
  }

  getArtistById(id: string): Promise<Artist> {
    return this.artistsRepository.getArtistById(id);
  }

  createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistsRepository.createArtist(createArtistDto);
  }

  uploadArtistProfilePicture(
    id: string,
    fileName: string,
    file: Buffer,
  ): Promise<void> {
    return this.artistsRepository.uploadArtistProfilePicture(
      id,
      fileName,
      file,
    );
  }

  uploadArtistWorkImage(
    id: string,
    fileName: string,
    file: Buffer,
  ): Promise<void> {
    return this.artistsRepository.uploadArtistWorkImage(id, fileName, file);
  }

  updateArtist(
    id: string,
    artistName: string,
    biography: string,
    work: Work[],
  ) {
    return this.artistsRepository.updateArtist(id, artistName, biography, work);
  }

  deleteArtist(id: string): Promise<void> {
    return this.artistsRepository.deleteArtist(id);
  }
}
