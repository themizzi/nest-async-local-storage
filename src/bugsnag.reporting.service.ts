import { Inject } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { Client } from '@bugsnag/js';
import { ReportingService } from './reporting.service';

export type Context = {
  client: Client;
};

export class BugsnagReportingService implements ReportingService {
  constructor(
    @Inject('REPORTING_ASYNC_LOCAL_STORAGE')
    private readonly asyncLocalStorage: AsyncLocalStorage<Context>,
  ) {}

  addMetadata(key: string, value: Record<string, any>) {
    const client = this.asyncLocalStorage.getStore().client;
    client.addMetadata(key, value);
  }

  notify(error: Error) {
    const client = this.asyncLocalStorage.getStore().client;
    client.notify(error);
  }
}
