"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
// TODO: Add types
// TODO: Add other methods
function AudioWaveform() {
    this.args = ["--input-filename", "-", "--input-format", "mp3"];
    this.input = function (stream) {
        this.stream = stream;
        return this;
    };
    this.toPng = function () {
        var baseArgs = this.args;
        this.args = __spreadArrays(baseArgs, ["--output-format", "png"]);
        return this;
    };
    this.toJSON = function () {
        var baseArgs = this.args;
        this.args = __spreadArrays(baseArgs, [
            "--output-format",
            "json",
            "--output-filename",
            "-",
        ]);
        return this;
    };
    this.pipe = function (res) {
        var myREPL = child_process_1.spawn("audiowaveform", __spreadArrays(this.args));
        this.stream.pipe(myREPL.stdin);
        myREPL.stdout.pipe(res);
    };
    return this;
}
exports.default = AudioWaveform;
