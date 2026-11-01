import { describe, expect, it } from "vitest";

import {
	useBuildVideoEmbed,
	useBuildVimeoEmbedUrl,
	useBuildYoutubeEmbedUrl,
	useBuildYoutubeThumbnail,
	useGetVimeoVideoId,
	useGetYoutubeVideoId,
	useParseMediaSource,
} from "@/core/services/media.service";

describe("media.service", () => {
	describe("useGetYoutubeVideoId", () => {
		it("parses watch URLs", () => {
			expect(useGetYoutubeVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
		});

		it("parses youtu.be, shorts, embed and live URLs", () => {
			expect(useGetYoutubeVideoId("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
			expect(useGetYoutubeVideoId("https://www.youtube.com/shorts/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
			expect(useGetYoutubeVideoId("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
			expect(useGetYoutubeVideoId("https://www.youtube.com/live/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
		});

		it("accepts bare ids and rejects garbage", () => {
			expect(useGetYoutubeVideoId("dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
			expect(useGetYoutubeVideoId("not a video!!")).toBeNull();
			expect(useGetYoutubeVideoId("")).toBeNull();
		});
	});

	describe("useParseMediaSource", () => {
		it("detects youtube, vimeo, file and unknown", () => {
			expect(useParseMediaSource("https://youtu.be/dQw4w9WgXcQ").provider).toBe("youtube");
			expect(useParseMediaSource("https://vimeo.com/123456789").provider).toBe("vimeo");
			expect(useParseMediaSource("https://cdn.example.com/talk.mp4").provider).toBe("file");
			expect(useParseMediaSource("https://example.com/page").provider).toBe("unknown");
		});

		it("keeps vimeo numeric ids", () => {
			expect(useGetVimeoVideoId("123456789")).toBe("123456789");
			expect(useGetVimeoVideoId("https://vimeo.com/abc")).toBeNull();
		});
	});

	describe("builders", () => {
		it("builds nocookie embeds with params", () => {
			const url = useBuildYoutubeEmbedUrl("dQw4w9WgXcQ", { start: 42, autoplay: true });
			expect(url).toContain("https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ");
			expect(url).toContain("start=42");
			expect(url).toContain("autoplay=1");
		});

		it("builds vimeo embeds with dnt", () => {
			expect(useBuildVimeoEmbedUrl("123456789")).toContain("https://player.vimeo.com/video/123456789");
		});

		it("builds thumbnails without an API key", () => {
			expect(useBuildYoutubeThumbnail("dQw4w9WgXcQ")).toBe(
				"https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
			);
		});
	});

	describe("useBuildVideoEmbed", () => {
		it("renders native video for direct files", () => {
			const { provider, html } = useBuildVideoEmbed({
				src: "https://cdn.example.com/talk.mp4",
				title: "My talk",
				caption: "Recorded live",
			});
			expect(provider).toBe("file");
			expect(html).toContain("<figure");
			expect(html).toContain("<video controls");
			expect(html).toContain("<figcaption>Recorded live</figcaption>");
			expect(html).not.toContain("<iframe");
		});

		it("renders a facade button for youtube by default", () => {
			const { provider, html } = useBuildVideoEmbed({
				src: "https://youtu.be/dQw4w9WgXcQ",
				title: "My talk",
			});
			expect(provider).toBe("youtube");
			expect(html).toContain("<figure");
			expect(html).toContain("data-video-facade=");
			expect(html).toContain("youtube-nocookie.com");
			expect(html).not.toContain("<iframe");
		});

		it("renders a direct iframe when facade is disabled", () => {
			const { html } = useBuildVideoEmbed({
				src: "https://youtu.be/dQw4w9WgXcQ",
				title: "My talk",
				facade: false,
			});
			expect(html).toContain("<iframe");
			expect(html).toContain('title="My talk"');
			expect(html).toContain('loading="lazy"');
		});

		it("escapes titles to prevent XSS", () => {
			const { html } = useBuildVideoEmbed({
				src: "https://youtu.be/dQw4w9WgXcQ",
				title: 'Talk "><script>alert(1)</script>',
				facade: false,
			});
			expect(html).not.toContain("<script>alert(1)</script>");
			expect(html).toContain("&lt;script&gt;");
		});

		it("does not create links for unsafe unknown-source protocols", () => {
			const { html } = useBuildVideoEmbed({
				src: "javascript:alert(document.domain)",
				title: "Unknown video",
			});

			expect(html).not.toContain("<a ");
			expect(html).not.toContain("javascript:");
			expect(html).toContain("Unknown video");
		});

		it("keeps safe links for unknown sources", () => {
			const { html } = useBuildVideoEmbed({
				src: "https://example.com/watch",
				title: "Watch video",
			});

			expect(html).toContain('<a href="https://example.com/watch">Watch video</a>');
		});
	});
});
