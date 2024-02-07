import { Module } from '@nestjs/common';
import { ArtistsModule } from './artists/artists.module';
import { ExhibitionModule } from './exhibition/exhibition.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ArtistsModule,
    ExhibitionModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'artcolony',
      database: 'artcolony',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
