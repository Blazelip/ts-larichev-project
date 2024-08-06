import { IStreamLogger } from "../core/handlers/stream-logger.interface";

export class ConsoleLoggger implements IStreamLogger {
  private static instance: ConsoleLoggger;
  private constructor() {}

  public static getInstance(): ConsoleLoggger {
    if (!ConsoleLoggger.instance) {
      ConsoleLoggger.instance = new ConsoleLoggger();
    }
    return ConsoleLoggger.instance;
  }

  public log(... args: any[]): void {
    console.log(...args);
  }

  public end(): void {
    console.log('Convertion is compelted');
  }

  public error(... args: any[]): void {
    console.log(...args);
  }
}