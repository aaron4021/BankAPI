import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Account } from './services/account/account.entity';
import { BankController } from './services/bank/bank.controller';

import { Bank } from './services/bank/bank.entity';
import { BankService } from './services/bank/bank.service';
import { UserController } from './services/user/user.controller';
import { User } from './services/user/user.entity';
import { UserService } from './services/user/user.service';



@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Bank, User, Account])],
  controllers: [AppController, BankController, UserController],
  providers: [AppService, BankService, UserService],
})
export class AppModule {}
