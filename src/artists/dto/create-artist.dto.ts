import { IsNotEmpty } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  artistName: string;

  @IsNotEmpty()
  biography: string;
}
