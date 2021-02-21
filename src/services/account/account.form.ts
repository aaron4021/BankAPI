import { IsInt } from "class-validator";

export class AccountCreateForm{
    @IsInt()
    userID: number

    @IsInt()
    bankID: number

    @IsInt()
    balance: number

}