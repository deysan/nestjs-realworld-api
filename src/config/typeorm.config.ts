import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { databaseOptions } from './database.options.js';

export const typeOrmConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  ...databaseOptions((key) => config.getOrThrow<string>(key)),
  // Nest collects entities registered via TypeOrmModule.forFeature().
  autoLoadEntities: true,
});
