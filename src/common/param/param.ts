import { IsNumberString } from "class-validator";

export class IDParam{
    @IsNumberString()
    id: string;


    
}