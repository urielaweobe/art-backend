import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from './artist.entity';

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
  artistWorkImage?: string;

  @Column()
  decription?: string;

  @Column()
  year?: string;

  @Column()
  workImage?: string;

  @Column()
  artistGalleryName?: string;

  @Column()
  imageOne?: string;

  @Column()
  imageTwo?: string;

  @Column()
  imageThree?: string;

  @ManyToOne(() => Artist, (artist) => artist.work)
  artist: Artist;
}
