import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MathCalculationController } from './services/mathcalculation/mathcalculation.controller';
import { MathCalculationService } from './services/mathcalculation/mathcalculation.service';
import { UserController } from './services/user/user.controller';
import { User } from './services/user/user.entity';
import { UserService } from './services/user/user.service';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([User])],
  controllers: [AppController, UserController, MathCalculationController],
  providers: [AppService, UserService, MathCalculationService],
})
export class AppModule {}
