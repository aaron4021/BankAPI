import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

import { Message } from "../../common/models/message";
import { IDParam } from "../../common/param/param";
import { Bank } from "./bank.entity";
import { BankCreateForm, BankUpdateForm } from "./bank.form";
import { BankService } from "./bank.service";

@Controller("/bank")
export class BankController {
    constructor(private readonly bankService: BankService) {}

    // localhost:3000/bank
    @Post()
    async createBank(@Body() form: BankCreateForm): Promise<Bank> {
        const bankData = await this.bankService.createNewBank(form.bankName);
        return bankData;
    }
    @Delete("/:id")
    async deleteBank(@Param() idParam: IDParam): Promise<Message>{
        const {id} = idParam;
        await this.bankService.delete(+id);
        return new Message ("Bank has been deleted successfully");
       

    }

    @Get()
    async getAllBank(): Promise<Bank[]>{
        const bankData = await this.bankService.getAllBank();
        return bankData;
    }

    @Get("/:id")
    async getOne(@Param()idParam: IDParam): Promise<Bank>{
        const {id} = idParam;
        const bankData = await this.bankService.getOne(+id);
        return bankData;
        
    }

    @Patch ("/:id")
    async updateBank(@Body() form : BankUpdateForm, @Param()idParam: IDParam): Promise<Bank>{
        const {id} = idParam;
        const newBank = await this.bankService.update({...form, bankID: +id})
        return newBank;

    }


}