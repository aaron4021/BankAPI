import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Message } from './common/models/message';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("tyr-hello-world")
  getHello(): string {
    return this.appService.getHello();
  }
}
