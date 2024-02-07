import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exhibition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  exhibitionImage: string;

  @Column()
  exhibitionDate: string;

  @Column()
  exhibitionDescription: string;
}
