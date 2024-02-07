import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { Work } from './entity/works.entity';
import { WorkRepository } from './repository/work.repository';
import { MulterModule } from '@nestjs/platform-express';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ArtistsRepository } from 'src/artists/repository/artists.repository';

@Module({
  imports: [
    MulterModule.register({ dest: './uploads' }),
    TypeOrmModule.forFeature([Work]),
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
  controllers: [WorkController],
  providers: [
    WorkService,
    WorkRepository,
    ArtistsRepository,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class WorkModule {}
