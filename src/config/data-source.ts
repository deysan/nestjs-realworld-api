import { DataSource } from 'typeorm';
import { databaseOptions } from './database.options.js';

// Used only by the TypeORM CLI (migration:generate / run / revert, schema:drop).
// The CLI does not start Nest, so env comes from `node --env-file=.env`,
// and it runs against compiled files in dist/ (hence *.js globs).
const getEnv = (key: string): string => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Missing env variable: ${key}`);
  }
  return value;
};

export default new DataSource({
  ...databaseOptions(getEnv),
  // dist/config -> dist/**/*.entity.js
  entities: [`${import.meta.dirname}/../**/*.entity.js`],
  // dist/config -> dist/migrations/*.js
  migrations: [`${import.meta.dirname}/../migrations/*.js`],
});
