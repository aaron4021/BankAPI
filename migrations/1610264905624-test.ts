import {MigrationInterface, QueryRunner} from "typeorm";

export class test1610264905624 implements MigrationInterface {
    name = 'test1610264905624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bank" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "bankName" character varying(30) NOT NULL, CONSTRAINT "PK_7651eaf705126155142947926e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying(32) NOT NULL, "email" character varying NOT NULL, "name" character varying(32) NOT NULL, "generation" integer NOT NULL, "bornDate" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "homeAddress" text NOT NULL, "residenceAddress" text NOT NULL, "campuss" character varying, "major" character varying, "graduationDate" character varying, "job" character varying, "jobAddress" character varying, "profilePicture" character varying(32), "password" character varying, "setPasswordToken" character varying(16), "role" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_691405ce1965bf8d4ad905a4f5c" UNIQUE ("profilePicture"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "bank"`);
    }

}
