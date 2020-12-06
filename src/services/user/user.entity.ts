import { Entity, Column } from "typeorm";
import { BasicEntity } from "../../common/entity/basic.entity";
import { UserRole } from "./user.enum";

@Entity()
export class User extends BasicEntity {
  @Column({ length: 32 })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 32 })
  name: string;

  @Column()
  generation: number;

  @Column()
  bornDate: string;

  @Column()
  phoneNumber: string;

  @Column("text")
  homeAddress: string;

  @Column("text")
  residenceAddress: string;

  @Column({ type: "varchar", nullable: true })
  campuss: string;

  @Column({ type: "varchar", nullable: true })
  major: string;

  @Column({ nullable: true })
  graduationDate: string;

  @Column({ nullable: true })
  job: string;

  @Column({ nullable: true })
  jobAddress: string;

  @Column({ type: "varchar", length: 32, nullable: true, unique: true })
  profilePicture: string | null;

  @Column({ type: "varchar", nullable: true })
  password: string | null;

  @Column({ type: "varchar", length: 16, nullable: true })
  setPasswordToken: string | null;

  @Column({ type: "varchar" })
  role: UserRole;
}
