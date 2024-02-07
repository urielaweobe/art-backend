import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistsRepository } from './repository/artists.repository';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(private artistsRepository: ArtistsRepository) {}

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

  updateArtist(id: string, artistName: string, biography: string) {
    return this.artistsRepository.updateArtist(id, artistName, biography);
  }

  deleteArtist(id: string): Promise<void> {
    return this.artistsRepository.deleteArtist(id);
  }
}
