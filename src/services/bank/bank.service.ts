import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Bank } from "./bank.entity";
import { BankUpdateData } from "./bank.model";

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

    async delete(bankID: number) {
        const bankData = await this.bankRepository.findOne({id: bankID});
        if (!bankData) {
            throw new BadRequestException("Bank not found");
        }
        console.log(bankData);

        return await this.bankRepository.delete(bankData.id);

    
    }

    async getAllBank(): Promise<Bank[]>{
        const bankData = await this.bankRepository.find();

        return bankData;
    }

    async getOne(bankID:number): Promise<Bank>{
        const bankData = await this.bankRepository.findOne({id: bankID});

        return bankData;


    }
    async update(reqData:BankUpdateData):Promise<Bank>{
        const bankData= await this.bankRepository.findOne({id: reqData.bankID});
        bankData.bankName= reqData.newBankName;
        
        await this.bankRepository.update({id: reqData.bankID},bankData);
        return bankData;
    }
}