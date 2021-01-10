import {MigrationInterface, QueryRunner} from "typeorm";

export class adduserbankaccount1610266827800 implements MigrationInterface {
    name = 'adduserbankaccount1610266827800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "userID" integer NOT NULL, "bankID" integer NOT NULL, "balance" integer NOT NULL, "code" integer NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "generation"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bornDate"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "homeAddress"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "residenceAddress"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "campuss"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "major"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "graduationDate"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "job"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "jobAddress"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_691405ce1965bf8d4ad905a4f5c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profilePicture"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "setPasswordToken"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying(20) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "setPasswordToken" character varying(16)`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profilePicture" character varying(32)`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_691405ce1965bf8d4ad905a4f5c" UNIQUE ("profilePicture")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "jobAddress" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "job" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "graduationDate" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "major" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "campuss" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "residenceAddress" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "homeAddress" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phoneNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "bornDate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "generation" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
