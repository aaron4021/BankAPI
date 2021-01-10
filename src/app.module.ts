import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Account } from './services/account/account.entity';

import { Bank } from './services/bank/bank.entity';
import { User } from './services/user/user.entity';



@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Bank, User, Account])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
