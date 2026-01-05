/**
 * Regex patterns for various YouTube URL formats
 */
export const PATTERNS = {
  // Video ID: 11 characters (alphanumeric, -, _)
  VIDEO_ID: /[a-zA-Z0-9_-]{11}/,

  // Standard and shortened video URLs
  VIDEO:
    /(?:(?:youtube\.com|youtube-nocookie\.com)\/(?:watch\?.*v=|embed\/|v\/|e\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,

  // Shorts
  SHORTS: /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,

  // Live
  LIVE: /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,

  // Playlists
  PLAYLIST: /[?&]list=([a-zA-Z0-9_-]+)/,

  // Channels
  CHANNEL_HANDLE: /youtube\.com\/(@[a-zA-Z0-9._-]+)/,
  CHANNEL_ID: /youtube\.com\/channel\/(UC[a-zA-Z0-9_-]{22})/,
  CHANNEL_CUSTOM: /youtube\.com\/c\/([a-zA-Z0-9_-]+)/,
  CHANNEL_USER: /youtube\.com\/user\/([a-zA-Z0-9_-]+)/,

  // Domains
  DOMAINS: /(?:youtube\.com|youtu\.be|youtube-nocookie\.com)/,
};
