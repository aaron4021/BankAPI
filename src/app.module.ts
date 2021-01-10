import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Account } from './services/account/account.entity';

import { Bank } from './services/bank/bank.entity';
import { MathCalculationController } from './services/mathcalculation/mathcalculation.controller';
import { MathCalculationService } from './services/mathcalculation/mathcalculation.service';
import { User } from './services/user/user.entity';



@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Bank, User, Account)],
  controllers: [AppController, MathCalculationController],
  providers: [AppService, MathCalculationService],
})
export class AppModule {}
