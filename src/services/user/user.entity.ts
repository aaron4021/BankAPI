import { Entity, Column } from "typeorm";
import { BasicEntity } from "../../common/entity/basic.entity";
import { UserController } from "./user.controller";
import { UserRole } from "./user.enum";


@Entity()
export class User extends BasicEntity{
  @Column ({length:40})
  name: string;

  @Column ({length : 40})
  email: string;

  @Column ({length:20})
  username: string;

  @Column()
  role: UserRole;




}
