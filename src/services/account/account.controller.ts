import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { IDParam } from "../../common/param/param";
import { Account } from "./account.entity";
import { AccountCreateForm, TransferForm, WithdrawForm } from "./account.form";
import { AccountDetailInfo, Withdraw } from "./account.model";
import { AccountService } from "./account.service";
import { Auth, Authorization, getToken } from "../../common/authorization/authorization";
import { unwatchFile } from "fs";
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

    @Post("transfer")
    async transfer(@Authorization() auth: Auth,@Body() form: TransferForm): Promise<Account>{
        console.log(form);
        const accdata = await this.accountService.funcTransfer({balance: form.balance, code: form.code, bankID: form.bankID, userID: auth.id});
        
        return accdata;
    }

    @Post("/withdraw")
    async withdraw(@Authorization() auth: Auth, @Body() form: WithdrawForm): Promise<Account>{
        const accdata = await this.accountService.withdrawbal({balance: form.balance, userID: auth.id});
        return accdata;
    }
}