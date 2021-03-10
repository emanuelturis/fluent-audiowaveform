# Fluent Audiowaveform
Fluent Audiowaveform is a Node.js wrapper around [audiowaveform](https://github.com/bbc/audiowaveform).

## Installation
```sh
yarn add fluent-audiowaveform
```

## Usage
>**Install [audiowaveform](https://github.com/bbc/audiowaveform) before using fluent-audiowaveform.**
### ES6 Import
```typescript
import audiowaveform from 'fluent-audiowaveform';
```

### Methods
**input(stream: Readable)**
```typescript
// Pass the stream containing input file
audiowaveform().input(stream)
```
**toPng(options:** {\
&nbsp;&nbsp;width?: number;\
&nbsp;&nbsp;height?: number;\
&nbsp;&nbsp;colors?: "audacity" | "audition";\
&nbsp;&nbsp;borderColor?: string;\
&nbsp;&nbsp;backgroundColor?: string;\
&nbsp;&nbsp;waveformColor?: string;\
&nbsp;&nbsp;axisLabelColor?: string;\
}**)**
```typescript
// Return a png image
audiowaveform().input(stream).toPng({
  width: 1200,
  height: 200,
  axisLabel: "ffffff",
  backgroundColor: "000000"
})
```
**toJSON()**
```typescript
// Return a JSON object
audiowaveform().input(stream).toJSON()
```
**start(seconds: number)**
```typescript
// Start at 53 seconds
audiowaveform().input(stream).toPng().start(53).pipe(res)
```
**end(seconds: number)**
```typescript
// End at 745 seconds
audiowaveform().input(stream).toPng().start(53).end(745).pipe(res)
```
**bits(8 | 16: number)**
 ```typescript
// 8 data bits
audiowaveform().input(stream).toJSON().bits(8).pipe(res)
```
**splitChannels()**
 ```typescript
// Split channels instead of a single waveform
audiowaveform().input(stream).toJSON().splitChannels().pipe(res)
```
**pixelsPerSecond(zoom: number)**
 ```typescript
// 50 pixels for second
audiowaveform().input(stream).toPNG().pixelsPerSecond(50).pipe(res)
```
**pipe(stream: Writable)**
```typescript
// Pass the output stream, usually the res object
audiowaveform().input(stream).toJSON().pipe(res)
```
**promise()**
```typescript
// Turn all methods into a promise
const jsonObject = await audiowaveform().input(stream).toJSON().promise()
```
