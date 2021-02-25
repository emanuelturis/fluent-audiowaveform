import { spawn } from "child_process";
import { Readable, Writable } from "stream";

// TODO: Add types
// TODO: Add other methods
const AudioWaveform = () => {
  let args = ["--input-filename", "-", "--input-format", "mp3"];
  let stream: Readable;

  const api = {
    args: ["--input-filename", "-", "--input-format", "mp3"],

    input: (providedStream: Readable) => {
      stream = providedStream;

      return api;
    },

    toPng: () => {
      const baseArgs = args;

      args = [...baseArgs, "--output-format", "png"];

      return api;
    },

    toJSON: () => {
      const baseArgs = args;
      args = [...baseArgs, "--output-format", "json", "--output-filename", "-"];
      return api;
    },

    pipe: (res: Writable) => {
      const myREPL = spawn("audiowaveform", args);

      stream.pipe(myREPL.stdin);

      myREPL.stdout.pipe(res);
    },
  };

  return api;
};

export default AudioWaveform;
