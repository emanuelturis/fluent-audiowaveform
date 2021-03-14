/// <reference types="node" />
import { Readable, Writable } from "stream";
declare type toPngOptions = {
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
    bits: (bits: 8 | 16) => this;
    splitChannels: () => this;
    pixelsPerSecond: (zoom: number) => this;
    pipe: (res: Writable) => void;
    promise: () => Promise<any>;
    end: (seconds: number) => this;
    start: (seconds: number) => this;
}
declare const AudioWaveform: () => IApi;
export default AudioWaveform;
