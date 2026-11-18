import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.getOrThrow<string>('DB_HOST'),
  port: Number(config.getOrThrow<string>('DB_PORT')),
  username: config.getOrThrow<string>('DB_USERNAME'),
  password: config.getOrThrow<string>('DB_PASSWORD'),
  database: config.getOrThrow<string>('DB_NAME'),
  autoLoadEntities: true,
  // Dev only: creates tables from entities automatically.
  // Will be replaced with migrations later.
  synchronize: true,
});
