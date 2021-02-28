import {MigrationInterface, QueryRunner} from "typeorm";

export class addRole1613900218017 implements MigrationInterface {
    name = 'addRole1613900218017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    }

}
