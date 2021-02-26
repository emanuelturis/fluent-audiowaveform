/// <reference types="node" />
import { Readable, Writable } from "stream";
interface IApi {
    input: (providedStream: Readable) => this;
    toPng: () => this;
    toJSON: () => this;
    pipe: (res: Writable) => void;
    promise: () => Promise<any>;
}
declare const AudioWaveform: () => IApi;
export default AudioWaveform;
