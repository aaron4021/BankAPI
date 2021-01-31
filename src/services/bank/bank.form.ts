import { IsInt, isInt, isString, IsString } from "class-validator";

export class BankCreateForm {
    @IsString()
    bankName: string;
}
export class BankUpdateForm {
    @IsInt()
    bankID: number;

    @IsString()
    newBankName: string;
}