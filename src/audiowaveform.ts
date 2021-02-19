import { Readable, Writable } from "stream";
import { spawn } from "child_process";

// TODO: Add types
// TODO: Add other methods
function AudioWaveform(this: any) {
  this.args = ["--input-filename", "-", "--input-format", "mp3"];

  this.input = function (stream: Readable) {
    this.stream = stream;
    return this;
  };

  this.toPng = function () {
    const baseArgs = this.args;
    this.args = [...baseArgs, "--output-format", "png"];
    return this;
  };

  this.toJSON = function () {
    const baseArgs = this.args;
    this.args = [
      ...baseArgs,
      "--output-format",
      "json",
      "--output-filename",
      "-",
    ];
    return this;
  };

  this.pipe = function (res: Writable) {
    const myREPL = spawn("audiowaveform", [...this.args]);

    this.stream.pipe(myREPL.stdin);

    myREPL.stdout.pipe(res);
  };

  return this;
}

export default AudioWaveform;
