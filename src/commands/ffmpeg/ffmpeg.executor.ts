import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor.ts/command.executor";
import { FileService } from "../../core/files/file.service";
import { IStreamLogger } from "../../core/handlers/stream-logger.interface";
import { PromptService } from "../../core/prompt/prompt.service";
import { ICommandExecFfmpeg, IFfmpegInput } from "./ffmpeg.type";
import { FfmpegBuilder } from "./ffmpeg.builder";
import { StreamHandler } from "../../core/handlers/stream.handler";

export class FFmpegExecutor extends CommandExecutor<IFfmpegInput> {
  private fileService: FileService = new FileService();
  private promptService: PromptService = new PromptService();

  constructor(logger: IStreamLogger) {
    super(logger);
  }

  protected async prompt(): Promise<IFfmpegInput> {
    const path = await this.promptService.input<string>('Введите путь до файла для конвертации', 'input');
    const name = await this.promptService.input<string>('Введите имя нового файла', 'input');
    const width = await this.promptService.input<number>('Введите ширину видео', 'number');
    const height = await this.promptService.input<number>('Введите высоту видео', 'number');

    return {
      path,
      name,
      width,
      height,
    }
  }
  protected build({ path, name, width, height }: IFfmpegInput): ICommandExecFfmpeg {
    const output = this.fileService.getFilePath(path, name, 'mp4');
    const args = new FfmpegBuilder().input(path).resolution(width, height).output(output);
    const command = {
      command: 'ffmpeg',
      args,
      output
    }
    return command;
  }
  protected spawn({ output, command, args}: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
    this.fileService.deleteFileIfExists(output);
    return spawn(command, args);

  }
  protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
    const handler = new StreamHandler(logger);
    handler.processOutput(stream);
  }
}