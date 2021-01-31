import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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
        const data = {
            ...reqData
        }
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
}