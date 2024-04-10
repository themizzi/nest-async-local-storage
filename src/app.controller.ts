import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    throw new Error('This is a test error');
  }

  @Get('wait')
  async getWait(): Promise<string> {
    // wait for 20 seconds then throw error
    await new Promise((resolve) => setTimeout(resolve, 20000));
    throw new Error('This is a test error');
  }
}
