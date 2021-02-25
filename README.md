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

**toPng()**
```typescript
audiowaveform().input(stream).toPng()
```

**toJSON()**
```typescript
audiowaveform().input(stream).toJSON()
```

**pipe(stream: Writable)**
```typescript
// Pass the output stream, usually the res object
audiowaveform().input(stream).pipe(res)
```

