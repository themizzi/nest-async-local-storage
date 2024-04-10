import { CanActivate, Inject, Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { Context } from './reporting.module';

@Injectable()
export class ReportingGuard implements CanActivate {
  constructor(
    @Inject('REPORTING_ASYNC_LOCAL_STORAGE')
    private readonly asyncLocalStorage: AsyncLocalStorage<Context>,
  ) {}

  canActivate(): boolean {
    this.asyncLocalStorage.getStore().counter.value++;
    return true;
  }
}
