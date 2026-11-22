import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsernameToUsers1795379702333 implements MigrationInterface {
  name = 'AddUsernameToUsers1795379702333';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Expand: add the column as nullable, so existing rows don't break it.
    await queryRunner.query(
      `ALTER TABLE "users" ADD "username" character varying`,
    );
    // 2. Backfill: give existing users a placeholder username.
    await queryRunner.query(
      `UPDATE "users" SET "username" = 'user' || "id" WHERE "username" IS NULL`,
    );
    // 3. Contract: now every row has a value, so the column can be NOT NULL.
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
  }
}
