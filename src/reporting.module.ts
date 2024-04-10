import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { ReportingFilter } from './reporting.filter';
import { ReportingGuard } from './reporting.guard';
import { ReportingMiddleware } from './reporting.middelware';

export type Context = {
  counter: {
    value: number;
  };
};

@Module({
  providers: [
    {
      provide: 'REPORTING_ASYNC_LOCAL_STORAGE',
      useValue: new AsyncLocalStorage<Context>(),
    },
    {
      provide: 'APP_FILTER',
      useClass: ReportingFilter,
    },
    {
      provide: 'APP_GUARD',
      useClass: ReportingGuard,
    },
  ],
})
export class ReportingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReportingMiddleware).forRoutes('*');
  }
}
