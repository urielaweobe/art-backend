import { Artist } from 'src/artists/entities/artist.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Work {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  mediaType: string;

  @Column()
  size: string;

  @Column()
  artistWorkImage: string;

  @Column()
  description: string;

  @Column()
  year: number;

  @Column()
  workImage: string;

  @Column()
  artistGalleryName: string;

  @Column()
  imageOne: string;

  @Column()
  imageTwo: string;

  @Column()
  imageThree: string;

  @ManyToOne(() => Artist, (artist) => artist.works)
  artist: Artist;
}
