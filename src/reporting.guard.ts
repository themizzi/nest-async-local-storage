import { CanActivate, Injectable } from '@nestjs/common';
import { BugsnagReportingService } from './bugsnag.reporting.service';

@Injectable()
export class ReportingGuard implements CanActivate {
  constructor(private readonly reportingService: BugsnagReportingService) {}

  canActivate(): boolean {
    this.reportingService.addMetadata('user', { id: 1, name: 'John Doe' });
    return true;
  }
}
