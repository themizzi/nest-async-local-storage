import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { Context } from './reporting.module';

@Catch()
@Injectable()
export class ReportingFilter implements ExceptionFilter {
  constructor(
    @Inject('REPORTING_ASYNC_LOCAL_STORAGE')
    private readonly asyncLocalStorage: AsyncLocalStorage<Context>,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const logger = new Logger();
    logger.log('counter', this.asyncLocalStorage.getStore().counter.value);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response.status(500).json({
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
