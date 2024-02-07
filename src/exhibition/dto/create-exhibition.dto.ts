import { IsNotEmpty } from 'class-validator';

export class CreateExhibitionDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  exhibitionImage?: string;

  @IsNotEmpty()
  exhibitionDescription: string;

  @IsNotEmpty()
  exhibitionDate: string;
}
