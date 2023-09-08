import { MigrationInterface, QueryRunner } from 'typeorm'

export class FirstMigration1692987123198 implements MigrationInterface {
  name = 'FirstMigration1692987123198'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."permission_module_enum" AS ENUM('users', 'posts', 'roles', 'comments', 'tags')`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."permission_action_enum" AS ENUM('read', 'create', 'edit', 'delete', 'own')`,
    )
    await queryRunner.query(
      `CREATE TABLE "permission" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" integer, "createdByName" character varying NOT NULL DEFAULT 'SYSTEM', "updatedBy" integer, "updatedByName" character varying NOT NULL DEFAULT 'SYSTEM', "module" "public"."permission_module_enum" NOT NULL, "action" "public"."permission_action_enum" NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_6aab65e9a6d63e7b0efdb5f0c2" ON "permission" ("module", "action") `,
    )
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" integer, "createdByName" character varying NOT NULL DEFAULT 'SYSTEM', "updatedBy" integer, "updatedByName" character varying NOT NULL DEFAULT 'SYSTEM', "userName" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying(230) NOT NULL, "lastName" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "email" character varying, "phone" character varying, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6aab65e9a6d63e7b0efdb5f0c2"`,
    )
    await queryRunner.query(`DROP TABLE "permission"`)
    await queryRunner.query(`DROP TYPE "public"."permission_action_enum"`)
    await queryRunner.query(`DROP TYPE "public"."permission_module_enum"`)
  }
}
