import { IsString } from "class-validator";

export class UserSignUpForm {
  @IsString()
  username: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class UserLoginForm {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
