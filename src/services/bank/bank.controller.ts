import { Body, Controller, Post } from "@nestjs/common";
import { Bank } from "./bank.entity";
import { BankCreateForm } from "./bank.form";
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
}