<p align="center">
  <img src="logo.png" alt="YouTubeWhat Logo" width="400">
</p>

# YouTubeWhat

A lightweight JavaScript/TypeScript utility for parsing, validating, and cleaning YouTube URLs.

[![npm version](https://img.shields.io/npm/v/youtubewhat.svg)](https://www.npmjs.com/package/youtubewhat)

## Features

- **Robust Parsing**: Handles standard, shortened, shorts, live, embed, and nocookie URLs.
- **Type Detection**: Identifies if a link is a video, playlist, or channel.
- **Thumbnail Generation**: Get thumbnail URLs with various quality options.
- **URL Cleaning**: Remove tracking parameters while keeping essential IDs and timestamps.
- **TypeScript Support**: Fully typed for a great developer experience.

## Installation

```bash
npm install youtubewhat
```

## Usage

### Parsing a URL

```typescript
import { parseYouTubeUrl } from "youtubewhat";

const info = parseYouTubeUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
// {
//   isValid: true,
//   id: 'dQw4w9WgXcQ',
//   type: 'video',
//   isShorts: false,
//   isLive: false,
//   originalUrl: '...'
// }
```

### Getting a Thumbnail

```typescript
import { getThumbnailUrl } from "youtubewhat";

const thumb = getThumbnailUrl("dQw4w9WgXcQ", { quality: "maxres" });
// https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg
```

### Cleaning a URL

```typescript
import { cleanYouTubeUrl } from "youtubewhat";

const clean = cleanYouTubeUrl(
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=share&t=10s"
);
// https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10s
```

## Supported Patterns

- Standard: `youtube.com/watch?v=...`
- Shortened: `youtu.be/...`
- Shorts: `youtube.com/shorts/...`
- Live: `youtube.com/live/...`
- Embed: `youtube.com/embed/...`
- Privacy-enhanced: `youtube-nocookie.com/embed/...`
- Playlists: `youtube.com/playlist?list=...`
- Channels: `@handle`, `/channel/ID`, `/c/Custom`, `/user/Name`

## License

MIT
