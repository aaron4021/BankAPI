import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Bank } from "./bank.entity";

@Injectable()
export class BankService {
    constructor(
        @InjectRepository(Bank) private readonly bankRepository: Repository<Bank>
    ) {}

    async createNewBank(bankName: string): Promise<Bank> {
        const isExist = await this.isExist(bankName);
        if (isExist){
            throw new BadRequestException("Bank name already existed");
        }

        const data = {
            bankName: bankName
        }

        const savedBankData = await this.bankRepository.save(data);
        return savedBankData;
    }

    async isExist(bankName: string): Promise<boolean> {
        const bankData = await this.bankRepository.find({bankName: bankName});
        if (bankData.length == 0)
            return false;
        return true;
    }

    async delete(bankID: number): Promise<void> {
        const bankData = await this.bankRepository.findOne({id: bankID});
        if (!bankData) {
            throw new BadRequestException("Bank not found");
        }

        await this.bankRepository.delete(bankData);
    }
}