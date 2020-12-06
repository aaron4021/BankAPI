import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { User } from "./user.entity";
import { UserCreateData } from "./user.model";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(data: UserCreateData): Promise<User> {
    await this.checkEmail(data.email);
    await this.checkUsername(data.username);
    return await this.userRepository.save(data);
  }

  async checkEmail(email: string): Promise<void> {
    const user = await this.userRepository.find({ email });
    if (user.length > 0) {
      throw new BadRequestException("Email sudah digunakan");
    }
  }

  async checkUsername(username: string): Promise<void> {
    const user = await this.userRepository.find({ username });
    if (user.length > 0) {
      throw new BadRequestException("Username sudah digunakan");
    }
  }

  async findByUsernameAndPassword(username: string, password): Promise<User | null> {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      return null;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException("Password salah");
    }

    return user;
  }

  async findUser(id: number): Promise<User> {
    return await this.userRepository.findOne({ id });
  }

  async fetchAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException("User tidak ditemukan.");
    }
    await this.userRepository.delete(user);
  }
}
