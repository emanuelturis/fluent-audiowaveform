import { Readable, Writable } from "stream";
declare const AudioWaveform: () => {
    args: string[];
    input: (providedStream: Readable) => any;
    toPng: () => any;
    toJSON: () => any;
    pipe: (res: Writable) => void;
};
export default AudioWaveform;
