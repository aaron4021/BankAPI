import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { runInThisContext } from "vm";
import { Bank } from "../bank/bank.entity";
import { User } from "../user/user.entity";
import { Account } from "./account.entity";
import { AccountCreateData, AccountDetailInfo, AccountTransfer, Withdraw } from "./account.model";

@Injectable()
export class AccountService{
    constructor(
        @InjectRepository(Account) private readonly accountRepository: Repository<Account>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Bank) private readonly bankRepository: Repository<Bank>
        
    ){}
    async createAccount(data: AccountCreateData): Promise<Account>{
        await this.checkUserIsExist(data.userID);
        await this.checkBankIsExist(data.bankID);
        
        const code = await this.generateCode();
        const newAccountData = {
            ...data,
            code
        }
        return await this.accountRepository.save(newAccountData)
    }
    async checkUserIsExist(userID: number): Promise<void>{
        const userData = await this.userRepository.findOne({ id:userID });
        if (!userData){
            throw new InternalServerErrorException("user not found");

    
        }
    
    }
    async checkBankIsExist(bankID:number):Promise<void>{
        const bankData = await this.bankRepository.findOne({ id: bankID});
        if (!bankData){
            throw new InternalServerErrorException("bank not found")
        }
    }
    async generateCode(): Promise<number>{
        const tempCode = Math.floor(Math.random()* Math.pow(10,9));
        if (await this.isCodeUsed(tempCode)){
            return await this.generateCode();
        }
        return tempCode;
    }
    async isCodeUsed(code: number): Promise<boolean>{
        const accdata = await this.accountRepository.findOne({code});
        if(accdata) return true;
        return false
    }
    async getDetailAccountInfo(accountID : number): Promise<AccountDetailInfo> {
        const detailinfo=await this.accountRepository
            .createQueryBuilder("a")
            .select("a.balance","balance")
            .addSelect("a.code","code")
            .addSelect("b.bankName","bankName")
            .addSelect("u.username","username")
            .leftJoin(User, "u", "a.userID = u.id")
            .leftJoin(Bank, "b","a.bankID = b.id")
            .where("a.id = " + accountID)
            .getRawOne()
        return detailinfo;


    }
    async funcTransfer(reqData: AccountTransfer): Promise<Account>{
        console.log(reqData)
        const accdata = await this.accountRepository.findOne({userID: reqData.userID});
        const transaccdata = await this.accountRepository.findOne({code: reqData.code});
        
        const balance = accdata.balance;
        const transfer = reqData.balance;
        if (accdata.bankID == transaccdata.bankID){
            const newbalance = balance - transfer;
            accdata.balance = newbalance;
        }
        else{
            const newbalance = balance- transfer - 5000;
            accdata.balance = newbalance;
        }
        
        const tnewbalance = transaccdata.balance + transfer;
        
        transaccdata.balance = tnewbalance;
        await this.accountRepository.update({userID:reqData.userID}, accdata)
        await this.accountRepository.update({code: reqData.code}, transaccdata)
        return accdata;




    }

    async withdrawbal(reqData: Withdraw): Promise<Account>{
        const accdata = await this.accountRepository.findOne({userID: reqData.userID});
        const balance = accdata.balance;
        const withdraw = reqData.balance;
        const newbal = balance - withdraw;
        accdata.balance = newbal;
        await this.accountRepository.update({userID: reqData.userID}, accdata)
        return accdata
    }
}
