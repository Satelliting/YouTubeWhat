export type YouTubeType = "video" | "playlist" | "channel" | "unknown";

export interface YouTubeInfo {
  isValid: boolean;
  id: string | null;
  type: YouTubeType;
  isShorts: boolean;
  isLive: boolean;
  playlistId?: string | null;
  originalUrl: string;
}

export interface ThumbnailOptions {
  quality: "default" | "medium" | "high" | "standard" | "maxres";
}
