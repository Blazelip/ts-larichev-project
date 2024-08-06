import { FFmpegExecutor } from "./commands/ffmpeg/ffmpeg.executor.js";
import { ConsoleLoggger } from "./out/console-logger.service.js";

export class App {
  async run() {
    const logger = ConsoleLoggger.getInstance();
    await new FFmpegExecutor(logger).execute();
  }
}

const app = new App();
app.run();