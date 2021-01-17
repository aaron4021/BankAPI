import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Account } from './services/account/account.entity';
import { BankController } from './services/bank/bank.controller';

import { Bank } from './services/bank/bank.entity';
import { BankService } from './services/bank/bank.service';
import { User } from './services/user/user.entity';



@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Bank, User, Account])],
  controllers: [AppController, BankController],
  providers: [AppService, BankService],
})
export class AppModule {}
