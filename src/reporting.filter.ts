import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Injectable,
  Logger,
} from '@nestjs/common';
import { BugsnagReportingService } from './bugsnag.reporting.service';

@Catch()
@Injectable()
export class ReportingFilter implements ExceptionFilter {
  constructor(private readonly reportingService: BugsnagReportingService) {}

  catch(exception: any, host: ArgumentsHost) {
    const logger = new Logger();
    logger.log('counter', this.reportingService.notify(exception));
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
