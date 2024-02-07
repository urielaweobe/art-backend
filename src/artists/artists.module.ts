import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { ArtistsRepository } from './repository/artists.repository';
import { MulterModule } from '@nestjs/platform-express';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MulterModule.register({ dest: './uploads' }),
    TypeOrmModule.forFeature([Artist]),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.getOrThrow('THROTTLE_TTL'),
          limit: config.getOrThrow('THROTTLE_LIMIT'),
        },
      ],
    }),
  ],
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    ArtistsRepository,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class ArtistsModule {}
