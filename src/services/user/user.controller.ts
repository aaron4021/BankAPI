import { Controller, Param, Get, Post, Body, BadRequestException, Delete } from "@nestjs/common";
import { hashSync } from "bcrypt";

import { UserService } from "./user.service";
import { User } from "./user.entity";
import { IdParam } from "../../common/form";
import { UserSignUpForm, UserLoginForm } from "./user.form";
import { UserRole } from "./user.enum";
import { getToken, Authorization, Auth } from "../../common/authorization/authorization";
import { Credential } from "./user.model";
import { Message } from "../../common/models/message";

@Controller("/user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/")
  async fetchUsers(): Promise<User[]> {
    const users = await this.userService.fetchAll();
    return users;
  }

  @Get("/:userId")
  async findUser(@Param() idParam: IdParam): Promise<User> {
    const { id } = idParam;
    const user = await this.userService.findUser(+id);
    return user;
  }

  @Post("/signup")
  async signup(@Body() form: UserSignUpForm): Promise<Credential> {
    const { username, email, password } = form;
    const data = {
      ...form,
      password: hashSync(form.password, 10),
      profilePicture: null,
      setPasswordToken: null,
      role: UserRole.Guest,
    };
    const user = await this.userService.create(data);
    const credential: Credential = {
      userId: user.id,
      token: getToken(user.id, user.role, user.name),
      name: user.name,
      role: user.role,
    };
    return credential;
  }

  @Post("/login")
  async login(@Body() form: UserLoginForm): Promise<Credential> {
    const { username, password } = form;
    const user = await this.userService.findByUsernameAndPassword(username, password);
    if (!user) {
      throw new BadRequestException("Login gagal");
    }

    const credential: Credential = {
      userId: user.id,
      token: getToken(user.id, user.role, user.name),
      name: user.name,
      role: user.role,
    };
    return credential;
  }

  @Delete("/delete/:id")
  async delete(@Authorization(["Admin"]) auth: Auth, @Param() idParam: IdParam): Promise<Message> {
    const { id } = idParam;
    await this.userService.deleteUser(+id);
    return new Message("User berhasil dihapus");
  }
}
