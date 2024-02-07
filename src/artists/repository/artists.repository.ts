import { DataSource, Repository } from 'typeorm';
import { Artist } from '../entities/artist.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { Work } from '../entities/works.entity';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ArtistsRepository extends Repository<Artist> {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(
    dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {
    super(Artist, dataSource.createEntityManager());
  }

  async getAllWorks(): Promise<Work[]> {
    const works = await this.createQueryBuilder('artist')
      .select('artist.work', 'work')
      .getRawMany();

    // Extract the 'work' field from the result
    const allWorks: Work[] = works.map((result) => result.work);

    return allWorks;
  }

  // Get All Artist
  async getAllArtist(): Promise<Artist[]> {
    const query = this.createQueryBuilder('artist');

    const artists = await query.getMany();

    return artists;
  }

  // Get Artist by ID
  async getArtistById(id: string): Promise<Artist> {
    const artist = await this.findOne({ where: { id } });

    if (!artist) {
      throw new NotFoundException(`Artist with ID "${id}" not found`);
    }

    return artist;
  }

  // Create an Artist
  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = this.create({
      ...createArtistDto,
    });

    await this.save(artist);

    return artist;
  }

  // Upload artist profile picture
  async uploadArtistProfilePicture(
    id: string,
    fileName: string,
    file: Buffer,
  ): Promise<void> {
    const artist = await this.findOne({ where: { id } });

    if (!artist) {
      throw new NotFoundException(`Artist with ID "${id}" not found`);
    }

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'test-artcolony',
        Key: fileName,
        Body: file,
      }),
    );

    artist.profilePicture = fileName;
    await this.save(artist);
  }

  // Upload artist work image
  async uploadArtistWorkImage(
    id: string,
    fileName: string,
    file: Buffer,
  ): Promise<void> {
    const artist = await this.findOne({ where: { id } });

    if (!artist) {
      throw new NotFoundException(`Artist with ID "${id}" not found`);
    }

    const folder = 'artist-work-images';
    const s3Key = `${folder}/${fileName}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'test-artcolony',
        Key: s3Key,
        Body: file,
      }),
    );

    const workIndexToUpdate = artist.work.findIndex(
      (workItem) => workItem.artistWorkImage === '',
    );

    if (workIndexToUpdate !== -1) {
      // Update the artistWorkImage property in the work array
      artist.work[workIndexToUpdate].artistWorkImage = s3Key;

      // Save the updated artist
      await this.save(artist);
    } else {
      // Handle the case where the work item was not found
      throw new NotFoundException(`Work item not found for ID "${id}"`);
    }
  }

  // Update Artist
  async updateArtist(
    id: string,
    artistName: string,
    biography: string,
    work: Work[],
  ): Promise<Artist> {
    const artist = await this.getArtistById(id);

    if (artistName) {
      artist.artistName = artistName;
    }

    if (biography) {
      artist.biography = biography;
    }

    if (work) {
      artist.work = work;
    }

    await this.save(artist);

    return artist;
  }

  // Delete Artist
  async deleteArtist(id: string): Promise<void> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Artist with ID "${id}" not found`);
    }
  }
}
