import { IsInt, isString, IsString } from "class-validator";

export class UserCreateForm {
    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsString()
    name: string;

    @IsString()
    role: string;

    @IsString()
    password: string;
}
export class UserUpdateForm{
    @IsInt()
    userID: number
    @IsString()
    newUserName: string

    @IsString()
    newName: string

    @IsString()
    newEmail: string

    @IsString()
    password:string
}
