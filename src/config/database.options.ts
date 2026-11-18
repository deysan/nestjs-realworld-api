import type { DataSourceOptions } from 'typeorm';

/** Reads a required env variable (e.g. ConfigService.getOrThrow or process.env). */
export type EnvGetter = (key: string) => string;

/**
 * Database connection settings shared by:
 * - Nest app (src/config/typeorm.config.ts)
 * - TypeORM CLI (src/config/data-source.ts)
 */
export const databaseOptions = (getEnv: EnvGetter) =>
  ({
    type: 'postgres',
    host: getEnv('DB_HOST'),
    port: Number(getEnv('DB_PORT')),
    username: getEnv('DB_USERNAME'),
    password: getEnv('DB_PASSWORD'),
    database: getEnv('DB_NAME'),
    // Schema is changed only through migrations now.
    synchronize: false,
  }) satisfies DataSourceOptions;
