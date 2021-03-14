import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { Account } from "../account/account.entity";
import { AccountDetailInfo } from "../account/account.model";
import { Bank } from "../bank/bank.entity";
import { User } from "./user.entity";
import { UserCreateData, UserUpdateData } from "./user.model";


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}
    async createNewUser(reqData: UserCreateData): Promise<User>{
        const isExist = await this.isExist(reqData.email);
        if (isExist){
            throw new BadRequestException("email already existed")
        }

        const hashedPassword = bcrypt.hashSync(reqData.password,12)
        

        const data = {
            ...reqData
        }
        data.password = hashedPassword;
        console.log(data);
        const savedUserData = await this.userRepository.save(data)
        return savedUserData;

    }

    async isExist(email:string): Promise<boolean>{
        const userData = await this.userRepository.find({email});
        if (userData.length == 0){
            return false;
        }
        return true;
    }

    async userLogin(reqData: UserCreateData): Promise<User>{
        
        const isExist = await this.isExist(reqData.email);
        if (!isExist){
            throw new BadRequestException("email does not exist");
        }

        const userData = await this.userRepository.findOne({email: reqData.email});

        const password = reqData.password;
        const userpassword = userData.password

        if (!bcrypt.compareSync(password, userpassword)){
            throw new BadRequestException('wrong password');
        }

        return userData;



    }

    async delete(userID: number){
        const userData = await this.userRepository.findOne({id: userID});
        if (!userData){
            throw new BadRequestException("User not found")
        }

        return await this.userRepository.delete(userData.id);
    }

    async getAllUser(): Promise<User[]>{
        const userData = await this.userRepository.find();
        return userData;
    }

    async getOne(userID: number): Promise<User>{
        const userData = await this.userRepository.findOne({id: userID});
        return userData
    }
    async update(reqData: UserUpdateData): Promise<User>{
        const userData = await this.userRepository.findOne({id: reqData.userID})
        userData.username = reqData.newUserName;
        userData.name=reqData.newName;
        userData.email=reqData.newEmail;

        await this.userRepository.update({id: reqData.userID}, userData)
        return userData;
    }
    async getuserAccs(userID: number): Promise<AccountDetailInfo[]>{
        const accDatas = await this.userRepository
            .createQueryBuilder("u")
            .select("a.balance","balance")
            .addSelect("a.code","code")
            .addSelect("b.bankName","bankName")
            .addSelect("u.username","username")
            .leftJoin(Account, "a", "u.id=a.userID")
            .leftJoin(Bank, "b","a.bankID = b.id")
            .where("u.id = "+userID)
            .getRawMany()
        return accDatas;
            
            
    }
}