import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { ReportingFilter } from './reporting.filter';
import { ReportingGuard } from './reporting.guard';
import { ReportingMiddleware } from './reporting.middelware';
import Bugsnag from '@bugsnag/js';
import { BugsnagReportingService, Context } from './bugsnag.reporting.service';
import { ReportingService } from './reporting.service';

export const REPORTING_ASYNC_LOCAL_STORAGE = Symbol(
  'REPORTING_ASYNC_LOCAL_STORAGE',
);

@Module({
  providers: [
    {
      provide: 'REPORTING_ASYNC_LOCAL_STORAGE',
      useValue: new AsyncLocalStorage<Context>(),
    },
    {
      provide: 'BUGSNAG_CLIENT',
      useValue: Bugsnag.start('asdf'),
    },
    {
      provide: 'APP_FILTER',
      useClass: ReportingFilter,
    },
    {
      provide: 'APP_GUARD',
      useClass: ReportingGuard,
    },
    {
      provide: ReportingService,
      useClass: BugsnagReportingService,
    },
  ],
})
export class ReportingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReportingMiddleware).forRoutes('*');
  }
}
