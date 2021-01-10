import { Entity, Column} from "typeorm";
import { BasicEntity } from "../../common/entity/basic.entity";

@Entity()
export class Account extends BasicEntity{
    @Column ()
    userID: number;

    @Column ()
    bankID: number;

    @Column ()
    balance: number;

    @Column ()
    code: number;
}