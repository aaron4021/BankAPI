import { IsInt, IsString } from "class-validator";

export class UserCreateForm {
    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsString()
    name: string;
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
}