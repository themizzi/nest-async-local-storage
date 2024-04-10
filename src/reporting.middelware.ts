import { AsyncLocalStorage } from 'async_hooks';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Client } from '@bugsnag/js';
import { Context } from './bugsnag.reporting.service';

@Injectable()
export class ReportingMiddleware implements NestMiddleware {
  constructor(
    @Inject('REPORTING_ASYNC_LOCAL_STORAGE')
    private readonly asyncLocalStorage: AsyncLocalStorage<Context>,
    @Inject('BUGSNAG_CLIENT')
    private readonly bugsnagClient: Client,
  ) {}

  use(req: Request, res: Response, next: () => void) {
    this.asyncLocalStorage.run(
      {
        client: this.bugsnagClient.resumeSession(),
      },
      () => {
        next();
      },
    );
  }
}
