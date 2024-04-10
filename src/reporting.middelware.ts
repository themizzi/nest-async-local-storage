import { AsyncLocalStorage } from 'async_hooks';
import { Context } from './reporting.module';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ReportingMiddleware implements NestMiddleware {
  constructor(
    @Inject('REPORTING_ASYNC_LOCAL_STORAGE')
    private readonly asyncLocalStorage: AsyncLocalStorage<Context>,
  ) {}

  use(req: Request, res: Response, next: () => void) {
    this.asyncLocalStorage.run(
      {
        counter: {
          value: 0,
        },
      },
      () => {
        next();
      },
    );
  }
}
