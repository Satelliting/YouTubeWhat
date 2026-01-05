import { parseYouTubeUrl, getThumbnailUrl, cleanYouTubeUrl } from "../src";

describe("YouTubeWhat Parser", () => {
  const testCases = [
    {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      expected: {
        id: "dQw4w9WgXcQ",
        type: "video",
        isShorts: false,
        isLive: false,
      },
    },
    {
      url: "https://youtu.be/dQw4w9WgXcQ",
      expected: {
        id: "dQw4w9WgXcQ",
        type: "video",
        isShorts: false,
        isLive: false,
      },
    },
    {
      url: "https://www.youtube.com/shorts/dQw4w9WgXcQ",
      expected: {
        id: "dQw4w9WgXcQ",
        type: "video",
        isShorts: true,
        isLive: false,
      },
    },
    {
      url: "https://www.youtube.com/live/dQw4w9WgXcQ",
      expected: {
        id: "dQw4w9WgXcQ",
        type: "video",
        isShorts: false,
        isLive: true,
      },
    },
    {
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      expected: {
        id: "dQw4w9WgXcQ",
        type: "video",
        isShorts: false,
        isLive: false,
      },
    },
    {
      url: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      expected: {
        id: "dQw4w9WgXcQ",
        type: "video",
        isShorts: false,
        isLive: false,
      },
    },
    {
      url: "https://www.youtube.com/playlist?list=PLBCF2DAC6FFB574DE",
      expected: {
        id: null,
        type: "playlist",
        playlistId: "PLBCF2DAC6FFB574DE",
      },
    },
    {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLBCF2DAC6FFB574DE",
      expected: {
        id: "dQw4w9WgXcQ",
        type: "video",
        playlistId: "PLBCF2DAC6FFB574DE",
      },
    },
    {
      url: "https://www.youtube.com/@YouTube",
      expected: { id: "@YouTube", type: "channel" },
    },
    {
      url: "https://www.youtube.com/channel/UC_x5XG1OV2P6uYZ5FSM9Ptw",
      expected: { id: "UC_x5XG1OV2P6uYZ5FSM9Ptw", type: "channel" },
    },
  ];

  testCases.forEach(({ url, expected }) => {
    it(`should correctly parse ${url}`, () => {
      const info = parseYouTubeUrl(url);
      expect(info.isValid).toBe(true);
      if (expected.id !== undefined) expect(info.id).toBe(expected.id);
      if (expected.type) expect(info.type).toBe(expected.type);
      if (expected.isShorts !== undefined)
        expect(info.isShorts).toBe(expected.isShorts);
      if (expected.isLive !== undefined)
        expect(info.isLive).toBe(expected.isLive);
      if (expected.playlistId !== undefined)
        expect(info.playlistId).toBe(expected.playlistId);
    });
  });

  it("should return invalid for non-YouTube URLs", () => {
    const info = parseYouTubeUrl("https://google.com");
    expect(info.isValid).toBe(false);
  });
});

describe("YouTubeWhat Utilities", () => {
  it("should generate correct thumbnail URLs", () => {
    const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    expect(getThumbnailUrl(url)).toBe(
      "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
    );
    expect(getThumbnailUrl("dQw4w9WgXcQ", { quality: "maxres" })).toBe(
      "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    );
  });

  it("should clean URLs correctly", () => {
    const messyUrl =
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=share&t=10s";
    const cleaned = cleanYouTubeUrl(messyUrl);
    expect(cleaned).toContain("v=dQw4w9WgXcQ");
    expect(cleaned).toContain("t=10s");
    expect(cleaned).not.toContain("feature=share");
  });
});
