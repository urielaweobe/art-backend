import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Work } from './works.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  artistName: string;

  @Column()
  biography: string;

  @Column()
  profilePicture: string;

  @Column('json')
  work: Work[];
}
