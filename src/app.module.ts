import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountController } from './services/account/account.controller';
import { Account } from './services/account/account.entity';
import { AccountService } from './services/account/account.service';
import { BankController } from './services/bank/bank.controller';

import { Bank } from './services/bank/bank.entity';
import { BankService } from './services/bank/bank.service';
import { UserController } from './services/user/user.controller';
import { User } from './services/user/user.entity';
import { UserService } from './services/user/user.service';



@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Bank, User, Account])],
  controllers: [AppController, BankController, UserController, AccountController],
  providers: [AppService, BankService, UserService, AccountService],
})
export class AppModule {}
