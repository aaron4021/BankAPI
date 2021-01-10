import { Entity, Column } from "typeorm";
import { BasicEntity } from "../../common/entity/basic.entity";


@Entity()
export class User extends BasicEntity{
  @Column ({length:40})
  name: string;

  @Column ({length : 40})
  email: string;

  @Column ({length:20})
  username: string;




}
