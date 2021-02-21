import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { IDParam } from "../../common/param/param";
import { Account } from "./account.entity";
import { AccountCreateForm } from "./account.form";
import { AccountDetailInfo } from "./account.model";
import { AccountService } from "./account.service";

@Controller("/account")
export class AccountController{
    constructor(private readonly accountService: AccountService){}

    @Post()
    async postAcc(@Body()form: AccountCreateForm): Promise<Account>{
        return await this.accountService.createAccount(form);
    }
    @Get("/:id")
    async getAcc(@Param() idParam: IDParam): Promise <AccountDetailInfo>{
        const {id} = idParam;
        const accData = await this.accountService.getDetailAccountInfo(+id);
        return accData;
        
    }

}