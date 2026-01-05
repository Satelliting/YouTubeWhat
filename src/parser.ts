import { PATTERNS } from "./patterns";
import { YouTubeInfo, YouTubeType } from "./types";

/**
 * Parses a YouTube URL and returns detailed information about it.
 * @param url The YouTube URL to parse
 */
export function parseYouTubeUrl(url: string): YouTubeInfo {
  const result: YouTubeInfo = {
    isValid: false,
    id: null,
    type: "unknown",
    isShorts: false,
    isLive: false,
    originalUrl: url,
  };

  if (!url || typeof url !== "string") return result;

  // Check if it's a valid YouTube domain
  if (!PATTERNS.DOMAINS.test(url)) return result;

  // Try matching Shorts first (most specific)
  const shortsMatch = url.match(PATTERNS.SHORTS);
  if (shortsMatch) {
    result.isValid = true;
    result.id = shortsMatch[1];
    result.type = "video";
    result.isShorts = true;
    return result;
  }

  // Try matching Live
  const liveMatch = url.match(PATTERNS.LIVE);
  if (liveMatch) {
    result.isValid = true;
    result.id = liveMatch[1];
    result.type = "video";
    result.isLive = true;
    return result;
  }

  // Try matching standard Video (watch, embed, shortened)
  const videoMatch = url.match(PATTERNS.VIDEO);
  if (videoMatch) {
    result.isValid = true;
    result.id = videoMatch[1];
    result.type = "video";
  }

  // Check for Playlist ID (can co-exist with video ID)
  const playlistMatch = url.match(PATTERNS.PLAYLIST);
  if (playlistMatch) {
    result.isValid = true;
    result.playlistId = playlistMatch[1];
    if (result.type === "unknown") {
      result.type = "playlist";
    }
  }

  // If still unknown, check for Channel patterns
  if (result.type === "unknown") {
    const channelMatch =
      url.match(PATTERNS.CHANNEL_HANDLE) ||
      url.match(PATTERNS.CHANNEL_ID) ||
      url.match(PATTERNS.CHANNEL_CUSTOM) ||
      url.match(PATTERNS.CHANNEL_USER);
    if (channelMatch) {
      result.isValid = true;
      result.id = channelMatch[1];
      result.type = "channel";
    }
  }

  return result;
}

/**
 * Simple check to see if a string is a valid YouTube URL.
 */
export function isYouTubeUrl(url: string): boolean {
  return parseYouTubeUrl(url).isValid;
}

/**
 * Extracts the video ID from a YouTube URL if it exists.
 */
export function getVideoId(url: string): string | null {
  const info = parseYouTubeUrl(url);
  return info.type === "video" ? info.id : null;
}
