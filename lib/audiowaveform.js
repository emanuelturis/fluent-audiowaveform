"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
// TODO: Add other methods
var AudioWaveform = function () {
    var args = [
        "--input-filename",
        "-",
        "--input-format",
        "mp3",
        "--output-filename",
        "-",
    ];
    var stream;
    // has required args
    var hasArgs = function () {
        return new Promise(function (resolve) {
            var hasOutputFormat = args.includes("--output-format");
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
    };
    var api = {
        input: function (providedStream) {
            stream = providedStream;
            return api;
        },
        toPng: function (options) {
            var baseArgs = args;
            var width = [];
            if (options && options.width) {
                width = ["--width", "" + options.width];
            }
            var height = [];
            if (options && options.height) {
                height = ["--height", "" + options.height];
            }
            var colors = [];
            if (options && options.colors) {
                colors = ["--colors", "" + options.colors];
            }
            var outputFormat = ["--output-format", "png"];
            args = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], baseArgs), outputFormat), width), height), colors);
            return api;
        },
        end: function (seconds) {
            var baseArgs = args;
            var endArgs = ["--end", "" + seconds];
            args = __spreadArray(__spreadArray([], baseArgs), endArgs);
            return api;
        },
        start: function (seconds) {
            var baseArgs = args;
            var startArgs = ["--end", "" + seconds];
            args = __spreadArray(__spreadArray([], baseArgs), startArgs);
            return api;
        },
        toJSON: function () {
            var baseArgs = args;
            args = __spreadArray(__spreadArray([], baseArgs), ["--output-format", "json"]);
            return api;
        },
        pipe: function (res) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, isValid, error, myREPL;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, hasArgs()];
                    case 1:
                        _a = _b.sent(), isValid = _a.isValid, error = _a.error;
                        if (!isValid) {
                            res.emit("error", new Error(error));
                            res.end();
                            return [2 /*return*/];
                        }
                        myREPL = child_process_1.spawn("audiowaveform", args);
                        stream.pipe(myREPL.stdin);
                        myREPL.stdout.pipe(res);
                        return [2 /*return*/];
                }
            });
        }); },
        promise: function () {
            return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                var _a, isValid, error, stdoutData, myREPL;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, hasArgs()];
                        case 1:
                            _a = _b.sent(), isValid = _a.isValid, error = _a.error;
                            if (!isValid) {
                                return [2 /*return*/, reject(error)];
                            }
                            stdoutData = "";
                            myREPL = child_process_1.spawn("audiowaveform", args);
                            stream.pipe(myREPL.stdin);
                            myREPL.stdout.on("data", function (data) {
                                stdoutData += data;
                            });
                            myREPL.stdout.on("end", function () {
                                resolve(stdoutData);
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
        },
    };
    return api;
};
exports.default = AudioWaveform;
