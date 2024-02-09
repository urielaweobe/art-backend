import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateWorkDto {
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

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  year: number;

  // Gallery extra information needed
  @IsNotEmpty()
  artistGalleryName: string;
}
