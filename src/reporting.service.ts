export abstract class ReportingService {
  abstract addMetadata(key: string, value: Record<string, any>): void;
  abstract notify(error: Error): void;
}
