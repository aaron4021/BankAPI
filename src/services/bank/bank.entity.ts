import { Entity, Column} from "typeorm";
import { BasicEntity } from "../../common/entity/basic.entity";

@Entity()
export class Bank extends BasicEntity {
    @Column ({length : 30})
    bankName: string;




}
