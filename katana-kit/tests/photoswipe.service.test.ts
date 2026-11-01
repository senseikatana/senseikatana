// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
	usePhotoSwipe,
	usePhotoSwipeDestroy,
	usePhotoSwipeOpen,
	usePhotoSwipeSupported,
} from "@/adapters/photoswipe/photoswipe.service";

const mocks = vi.hoisted(() => ({
	init: vi.fn(),
	destroy: vi.fn(),
	loadAndOpen: vi.fn(() => true),
	options: {} as Record<string, unknown>,
	created: 0,
}));

vi.mock("photoswipe/lightbox", () => ({
	default: class FakeLightbox {
		options: Record<string, unknown>;
		init = mocks.init;
		destroy = mocks.destroy;
		loadAndOpen = mocks.loadAndOpen;

		constructor(options: Record<string, unknown>) {
			this.options = options;
			mocks.options = options;
			mocks.created += 1;
		}
	},
}));

function gallery(id: string, slides = 1): string {
	return `<div id="${id}" data-pswp>${'<a href="/large.jpg"><img src="/thumb.jpg" /></a>'.repeat(slides)}</div>`;
}

describe("PhotoSwipe adapter", () => {
	beforeEach(() => {
		usePhotoSwipeDestroy();
		vi.clearAllMocks();
		mocks.created = 0;
		mocks.loadAndOpen.mockReturnValue(true);
		document.body.innerHTML = "";
	});

	describe("usePhotoSwipeSupported", () => {
		it("is true in a browser environment", () => {
			expect(usePhotoSwipeSupported()).toBe(true);
		});
	});

	describe("usePhotoSwipe", () => {
		it("returns an error when no gallery matches the selector", async () => {
			const result = await usePhotoSwipe({ gallery: "#missing" });

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error.message).toContain('no gallery matched "#missing"');
				expect(result.error.details).toMatchObject({ root: "document" });
			}
			expect(mocks.created).toBe(0);
		});

		it("scopes the selector to the given root", async () => {
			document.body.innerHTML = `<div id="widget">${gallery("inside")}</div>${gallery("outside")}`;

			const result = await usePhotoSwipe({ root: "#widget" });

			expect(result.ok).toBe(true);
			expect(mocks.created).toBe(1);
			const bound = mocks.options.gallery as HTMLElement[];
			expect(bound).toHaveLength(1);
			expect(bound[0]?.id).toBe("inside");
		});

		it("binds the default selectors", async () => {
			document.body.innerHTML = gallery("hero", 3);

			const result = await usePhotoSwipe();

			expect(result.ok).toBe(true);
			expect(mocks.options.children).toBe("a");
			expect(mocks.init).toHaveBeenCalledTimes(1);
			expect((mocks.options.gallery as HTMLElement[])[0]?.id).toBe("hero");
		});

		it("rebinds late DOM without constructing a second lightbox", async () => {
			document.body.innerHTML = gallery("first");
			await usePhotoSwipe();

			document.body.insertAdjacentHTML("beforeend", gallery("second"));
			const again = await usePhotoSwipe();

			expect(again.ok).toBe(true);
			expect(mocks.created).toBe(1);
			expect(mocks.init).toHaveBeenCalledTimes(2);
			expect((mocks.options.gallery as HTMLElement[]).map((el) => el.id)).toEqual(["first", "second"]);
		});

		it("passes lightbox options through", async () => {
			document.body.innerHTML = gallery("hero");

			await usePhotoSwipe({ lightbox: { bgOpacity: 0.8, index: 1 } });

			expect(mocks.options.bgOpacity).toBe(0.8);
			expect(mocks.options.index).toBe(1);
			expect(typeof mocks.options.pswpModule).toBe("function");
		});
	});

	describe("usePhotoSwipeOpen", () => {
		it("binds on demand when nothing is bound yet", async () => {
			document.body.innerHTML = gallery("hero");

			const result = await usePhotoSwipeOpen(1);

			expect(result.ok).toBe(true);
			expect(mocks.loadAndOpen).toHaveBeenCalledWith(1, undefined);
		});

		it("forwards a data source for galleries without DOM markup", async () => {
			document.body.innerHTML = gallery("hero");
			await usePhotoSwipe();
			const slides = [{ src: "/a.jpg", width: 1600, height: 1067, alt: "A" }];

			const result = await usePhotoSwipeOpen(0, slides);

			expect(result.ok).toBe(true);
			expect(mocks.loadAndOpen).toHaveBeenCalledWith(0, slides);
		});

		it("surfaces a failed open instead of throwing", async () => {
			document.body.innerHTML = gallery("hero");
			await usePhotoSwipe();
			mocks.loadAndOpen.mockReturnValue(false);

			const result = await usePhotoSwipeOpen(9);

			expect(result.ok).toBe(false);
			if (!result.ok) expect(result.error.message).toContain("slide 9");
		});
	});

	describe("usePhotoSwipeDestroy", () => {
		it("destroys the lightbox and unbinds the cache", async () => {
			document.body.innerHTML = gallery("hero");
			await usePhotoSwipe();

			const destroyed = usePhotoSwipeDestroy();

			expect(destroyed.ok).toBe(true);
			expect(mocks.destroy).toHaveBeenCalledTimes(1);

			const again = usePhotoSwipeDestroy();
			expect(again.ok).toBe(false);
			if (!again.ok) expect(again.error.message).toContain("no lightbox");
		});
	});
});
