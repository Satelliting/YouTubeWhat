import { parseYouTubeUrl } from "./parser";
import { ThumbnailOptions } from "./types";

/**
 * Generates a thumbnail URL for a given YouTube video ID or URL.
 */
export function getThumbnailUrl(
  idOrUrl: string,
  options: ThumbnailOptions = { quality: "high" }
): string | null {
  let id: string | null = idOrUrl;

  // If it's a URL, extract the ID
  if (idOrUrl.includes(".") || idOrUrl.includes("/")) {
    const info = parseYouTubeUrl(idOrUrl);
    if (info.type !== "video" || !info.id) return null;
    id = info.id;
  }

  // Validate ID format (basic check)
  if (!id || id.length !== 11) return null;

  const qualityMap: Record<ThumbnailOptions["quality"], string> = {
    default: "default",
    medium: "mqdefault",
    high: "hqdefault",
    standard: "sddefault",
    maxres: "maxresdefault",
  };

  const quality = qualityMap[options.quality] || "hqdefault";
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
}

/**
 * Cleans a YouTube URL by removing tracking parameters and non-essential query strings.
 * Keeps 'v' for videos, 'list' for playlists, and 't' for timestamps if requested.
 */
export function cleanYouTubeUrl(
  url: string,
  keepTimestamp: boolean = true
): string | null {
  const info = parseYouTubeUrl(url);
  if (!info.isValid) return null;

  try {
    const urlObj = new URL(url);
    const cleanObj = new URL(
      `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`
    );

    if (info.id && info.type === "video") {
      if (url.includes("youtu.be")) {
        cleanObj.host = "youtu.be";
        cleanObj.pathname = `/${info.id}`;
      } else if (url.includes("shorts")) {
        cleanObj.pathname = `/shorts/${info.id}`;
      } else if (url.includes("live")) {
        cleanObj.pathname = `/live/${info.id}`;
      } else if (url.includes("embed")) {
        cleanObj.pathname = `/embed/${info.id}`;
      } else {
        cleanObj.pathname = "/watch";
        cleanObj.searchParams.set("v", info.id);
      }
    }

    if (info.playlistId) {
      if (info.type === "playlist") {
        cleanObj.pathname = "/playlist";
      }
      cleanObj.searchParams.set("list", info.playlistId);
    }

    if (keepTimestamp) {
      const t = urlObj.searchParams.get("t");
      if (t) cleanObj.searchParams.set("t", t);
    }

    return cleanObj.toString();
  } catch (e) {
    return null;
  }
}
