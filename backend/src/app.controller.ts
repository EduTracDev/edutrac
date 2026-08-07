import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  root() {
    return {
      status: 'ok',
      service: 'edutrac-api',
    };
  }

  @Get()
  edutrac(){
    return {
      success: true,
      message: "Edutrac API",
      data: null,
      error: null
    }
  }
}