import { spawn } from "child_process";
import { Readable, Writable } from "stream";

type toPngOptions = {
  width?: number;
  height?: number;
  colors?: "audacity" | "audition";
  borderColor?: string;
  backgroundColor?: string;
  waveformColor?: string;
  axisLabelColor?: string;
};

interface IApi {
  input: (providedStream: Readable) => this;
  toPng: (options?: toPngOptions) => this;
  toJSON: () => this;
  pipe: (res: Writable) => void;
  // TODO: Add type to Promise
  promise: () => Promise<any>;
  end: (seconds: number) => this;
  start: (seconds: number) => this;
}

// TODO: Add other methods
const AudioWaveform = () => {
  let args = [
    "--input-filename",
    "-",
    "--input-format",
    "mp3",
    "--output-filename",
    "-",
  ];

  let stream: Readable;

  // has required args
  const hasArgs = () =>
    new Promise<{ isValid: boolean; error?: string | undefined }>((resolve) => {
      const hasOutputFormat = args.includes("--output-format");

      // audiowaveform requires --output-format when --output-format is -
      if (!hasOutputFormat) {
        return resolve({
          isValid: false,
          error: "Output format is required.",
        });
      }

      // audiowaveform requires standard input when --input-filename is -
      if (!stream) {
        return resolve({
          isValid: false,
          error: "Stream is required.",
        });
      }

      return resolve({
        isValid: true,
      });
    });

  const api: IApi = {
    input: (providedStream: Readable) => {
      stream = providedStream;

      return api;
    },

    toPng: (options) => {
      const baseArgs = args;

      let width: string[] = [];
      if (options && options.width) {
        width = ["--width", `${options.width}`];
      }

      let height: string[] = [];
      if (options && options.height) {
        height = ["--height", `${options.height}`];
      }

      let colors: string[] = [];
      if (options && options.colors) {
        colors = ["--colors", `${options.colors}`];
      }

      let borderColor: string[] = [];
      if (options && options.borderColor) {
        borderColor = ["--border-color", `${options.borderColor}`];
      }

      let backgroundColor: string[] = [];
      if (options && options.backgroundColor) {
        backgroundColor = ["--background-color", `${options.backgroundColor}`];
      }

      let waveformColor: string[] = [];
      if (options && options.waveformColor) {
        waveformColor = ["--waveform-color", `${options.waveformColor}`];
      }

      let axisLabelColor: string[] = [];
      if (options && options.axisLabelColor) {
        axisLabelColor = ["--axis-label-color", `${options.axisLabelColor}`];
      }

      const outputFormat = ["--output-format", "png"];

      args = [
        ...baseArgs,
        ...outputFormat,
        ...width,
        ...height,
        ...colors,
        ...borderColor,
        ...backgroundColor,
        ...waveformColor,
        ...axisLabelColor,
      ];

      return api;
    },

    end: (seconds) => {
      const baseArgs = args;
      const endArgs: string[] = ["--end", `${seconds}`];
      args = [...baseArgs, ...endArgs];
      return api;
    },

    start: (seconds) => {
      const baseArgs = args;
      const startArgs: string[] = ["--end", `${seconds}`];
      args = [...baseArgs, ...startArgs];
      return api;
    },

    toJSON: () => {
      const baseArgs = args;
      args = [...baseArgs, "--output-format", "json"];
      return api;
    },

    pipe: async (res) => {
      const { isValid, error } = await hasArgs();

      if (!isValid) {
        res.emit("error", new Error(error));
        res.end();
        return;
      }

      const myREPL = spawn("audiowaveform", args);

      stream.pipe(myREPL.stdin);

      myREPL.stdout.pipe(res);

      return;
    },

    promise: () => {
      return new Promise(async (resolve, reject) => {
        const { isValid, error } = await hasArgs();

        if (!isValid) {
          return reject(error);
        }

        let stdoutData: string = "";

        const myREPL = spawn("audiowaveform", args);

        stream.pipe(myREPL.stdin);

        myREPL.stdout.on("data", (data) => {
          stdoutData += data;
        });

        myREPL.stdout.on("end", () => {
          resolve(stdoutData);
        });
      });
    },
  };

  return api;
};

export default AudioWaveform;
