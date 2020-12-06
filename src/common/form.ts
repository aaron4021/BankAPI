import { IsNumberString, IsString } from "class-validator";

export class TokenQuery {
  @IsString()
  token: string;
}

export class IdParam {
  @IsNumberString()
  id: string;
}
