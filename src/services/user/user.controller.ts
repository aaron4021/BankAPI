import { Get } from "@nestjs/common";
import { Patch } from "@nestjs/common";
import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { Auth, Authorization, getToken } from "../../common/authorization/authorization";

import { IdParam } from "src/common/form";

import { Message } from "../../common/models/message";
import { IDParam } from "../../common/param/param";
import { AccountDetailInfo } from "../account/account.model";
import { User } from "./user.entity";
import { UserCreateForm, UserUpdateForm } from "./user.form";
import { UserCreateData, UserUpdateData } from "./user.model";
import { UserService } from "./user.service";
import { createSecureServer } from "http2";

@Controller("/user")
export class UserController{
    constructor(private readonly userService:UserService){}

    @Post("/signup")
    async signup(@Body() form: UserCreateForm): Promise<Message>{
        const userData = await this.userService.createNewUser(form)
        return new Message(getToken(userData.id, userData.role, userData.username))
      
        //return getToken(1, "Admin", "Jason");
    }

    @Post("/login")
    async login(@Body() form: UserCreateForm): Promise<any>{
        const userData = await this.userService.userLogin(form)
        const token = getToken(userData.id, userData.role, userData.username)
        return {
            username: userData.username,
            role: userData.role,
            email: userData.email,
            token
        }
        
    }

    @Post()
    // async createUser(@Body() form: UserCreateForm): Promise<User>{
    //     const userData = await this.userService.createNewUser(form)
    //     console.log(form)
    //     return userData;
    //}

    @Delete("/:id")
    async deleteUser (@Param() idParam: IDParam): Promise<Message>{
        const {id} = idParam;
        await this.userService.delete(+id)
        return new Message ("Bank has been delted successfully")
    }

    @Get()
    async getAllUser(@Authorization() auth : Auth): Promise<User[]>{
        
        const userData = await this.userService.getAllUser();
        return userData;

    
        
    }
    @Get("/me")
    async getmyprofile(@Authorization() auth: Auth): Promise<Auth>{
        console.log(auth)
        return auth;
    }
    @Get("/:id")
    async getOne(@Param()idParam:IDParam):Promise <User>{
        const{id}= idParam;
        const userData = await this.userService.getOne(+id);
        return userData
    }

    @Patch("/:id")
    async updateUser(@Body() form : UserUpdateForm, @Param()idParam:IDParam): Promise<User>{
        const{id} = idParam;
        const newUser = await this.userService.update({...form, userID: +id})
        return newUser;
    }
    @Get("/:id/accounts")
    async getAccs(@Param() idParam: IDParam): Promise<AccountDetailInfo[]>{
        const {id} = idParam
        const accallDatas = await this.userService.getuserAccs(+id);
        return accallDatas;
    }


    


}