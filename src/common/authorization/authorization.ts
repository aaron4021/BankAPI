import { createParamDecorator, UnauthorizedException } from "@nestjs/common";
import { IsInt, IsString } from "class-validator";
import * as jwt from "jsonwebtoken";
const JWT_KEY = process.env.JWT_SECRET_KEY || "topsecret";

export class Auth {
    @IsInt()
    id: number;
  
    @IsString()
    role: AuthRole;
  
    @IsString()
    name: string;
  
    @IsInt()
    iat: number;
  
    @IsInt()
    exp: number;
  }

type AuthRole="Admin"|"Guest";

export const Authorization = createParamDecorator(async(roles: AuthRole[], req) =>{
    let verifiedUser : Auth;
    try {
        const token = req.args[0].headers.authorization.split(" ")[1];
        verifiedUser = <Auth> jwt.verify(token, JWT_KEY);
    } catch (error) {
        throw new UnauthorizedException("Login first")
    }
    return verifiedUser;
})

export function getToken(id: number, role: AuthRole, name: string): string{
    const credential = {id, role, name};
    const token = jwt.sign(credential, JWT_KEY, { expiresIn: "3h"})
    return token;
}

