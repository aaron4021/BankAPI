import { IsInt } from "class-validator";

export class AccountCreateForm{
    @IsInt()
    userID: number

    @IsInt()
    bankID: number

    @IsInt()
    balance: number

}

export class TransferForm{


    @IsInt()
    balance: number

    @IsInt()
    code: number;

    @IsInt()
    bankID: number;
}

export class WithdrawForm{
    @IsInt()
    balance: number;
}