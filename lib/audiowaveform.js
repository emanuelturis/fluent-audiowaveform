"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
// TODO: Add other methods
var AudioWaveform = function () {
    var args = ["--input-filename", "-", "--input-format", "mp3"];
    var stream;
    var api = {
        input: function (providedStream) {
            stream = providedStream;
            return api;
        },
        toPng: function () {
            var baseArgs = args;
            args = __spreadArray(__spreadArray([], baseArgs), ["--output-format", "png"]);
            return api;
        },
        toJSON: function () {
            var baseArgs = args;
            args = __spreadArray(__spreadArray([], baseArgs), ["--output-format", "json", "--output-filename", "-"]);
            return api;
        },
        pipe: function (res) {
            var myREPL = child_process_1.spawn("audiowaveform", args);
            stream.pipe(myREPL.stdin);
            myREPL.stdout.pipe(res);
        },
        promise: function () {
            var hasOutputFormat = args.includes("--output-format");
            return new Promise(function (resolve, reject) {
                // audiowaveform requires --output-format when --output-format is -
                if (!hasOutputFormat) {
                    return reject("Output format is required.");
                }
                // audiowaveform requires standard input when --input-filename is -
                if (!stream) {
                    return reject("Stream is required.");
                }
                var stdoutData = "";
                var myREPL = child_process_1.spawn("audiowaveform", args);
                stream.pipe(myREPL.stdin);
                myREPL.stdout.on("data", function (data) {
                    stdoutData += data;
                });
                myREPL.stdout.on("end", function () {
                    resolve(stdoutData);
                });
            });
        },
    };
    return api;
};
exports.default = AudioWaveform;
