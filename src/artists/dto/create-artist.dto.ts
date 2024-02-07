import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  artistName: string;

  work: Work[];

  @IsNotEmpty()
  biography: string;

  // @IsNotEmpty()
  // profilePicture: Buffer;
}

class Work {
  // Artist work
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsNotEmpty()
  mediaType: string;

  @IsOptional()
  @IsNotEmpty()
  size: string;

  @IsOptional()
  @IsNotEmpty()
  artistWorkImage?: string;

  @IsOptional()
  @IsNotEmpty()
  decription?: string;

  @IsOptional()
  @IsNotEmpty()
  year?: string;

  @IsOptional()
  @IsNotEmpty()
  workImage?: string;

  // Gallery extra information needed
  @IsOptional()
  @IsNotEmpty()
  artistGalleryName?: string;

  @IsOptional()
  @IsNotEmpty()
  imageOne?: string;

  @IsOptional()
  @IsNotEmpty()
  imageTwo?: string;

  @IsOptional()
  @IsNotEmpty()
  imageThree?: string;
}
