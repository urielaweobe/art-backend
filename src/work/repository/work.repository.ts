import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Work } from '../entity/works.entity';
import { CreateWorkDto } from '../dto/create-work.dto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { ArtistsRepository } from 'src/artists/repository/artists.repository';

@Injectable()
export class WorkRepository extends Repository<Work> {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(
    private dataSource: DataSource,
    private readonly configService: ConfigService,
    private artistsRepository: ArtistsRepository,
  ) {
    super(Work, dataSource.createEntityManager());
  }

  async getAllWorks(): Promise<Work[]> {
    const query = this.createQueryBuilder('work');

    const works = await query.getMany();

    return works;
  }

  // create work
  async createWork(
    artistId: string,
    createWorkDto: CreateWorkDto,
  ): Promise<Work> {
    const artist = await this.artistsRepository.findOne({
      where: { id: artistId },
    });

    if (!artist) {
      throw new NotFoundException(`Artist with ID "${artistId}" not found`);
    }

    if (!artist.works) {
      artist.works = [];
    }

    const work = this.create({
      ...createWorkDto,
    });

    artist.works.push(work);

    await this.artistsRepository.save(artist);
    await this.save(work);

    return work;
  }

  // upload artist work image
  async uploadArtistWorkImage(
    id: string,
    fileName: string,
    file: Buffer,
  ): Promise<void> {
    const work = await this.findOne({ where: { id } });

    if (!work) {
      throw new NotFoundException(`Work with ID "${id}" not found`);
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

    work.artistWorkImage = fileName;
    await this.save(work);
  }

  // upload work image
  async uploadWorkImage(
    id: string,
    fileName: string,
    file: Buffer,
  ): Promise<void> {
    const work = await this.findOne({ where: { id } });

    if (!work) {
      throw new NotFoundException(`Work with ID "${id}" not found`);
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

    work.workImage = fileName;
    await this.save(work);
  }

  // upload image one
  async uploadImageOne(
    id: string,
    fileName: string,
    file: Buffer,
  ): Promise<void> {
    const work = await this.findOne({ where: { id } });

    if (!work) {
      throw new NotFoundException(`Work with ID "${id}" not found`);
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

    work.imageOne = fileName;
    await this.save(work);
  }

  // upload image two
  async uploadImageTwo(
    id: string,
    fileName: string,
    file: Buffer,
  ): Promise<void> {
    const work = await this.findOne({ where: { id } });

    if (!work) {
      throw new NotFoundException(`Work with ID "${id}" not found`);
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

    work.imageTwo = fileName;
    await this.save(work);
  }

  // upload image three
  async uploadImageThree(
    id: string,
    fileName: string,
    file: Buffer,
  ): Promise<void> {
    const work = await this.findOne({ where: { id } });

    if (!work) {
      throw new NotFoundException(`Work with ID "${id}" not found`);
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

    work.imageThree = fileName;
    await this.save(work);
  }

  // delete work
  async deleteWork(id: string): Promise<void> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Work with ID "${id}" not found`);
    }
  }
}
