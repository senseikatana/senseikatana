/** Banner layouts. `hero` is full-width promo, `card` a product offer, `bar` a slim strip. */
export type BannerLayout = "hero" | "card" | "bar";

/** Semantic banner tones. */
export type BannerTone = "info" | "success" | "warning" | "danger";

/** Call to action rendered with the kit's `.btn` classes. */
export interface BannerAction {
	/** Link text. */
	label: string;
	/** Destination. */
	href: string;
}

/** Options for {@link useBanner} and {@link bannerClass}. */
export interface BannerOptions {
	/** Layout (default: `"card"`). */
	layout?: BannerLayout;
	/** Semantic tone (default: `"info"`). */
	tone?: BannerTone;
	/** Headline. Becomes the region's accessible name when `ariaLabel` is absent. */
	title?: string;
	/** Supporting line under the title. */
	subtitle?: string;
	/**
	 * Free-text badge (`"-40%"`, `"Today only"`). When omitted and both `price`
	 * and `wasPrice` are given, it is derived from them.
	 */
	badge?: string;
	/** Current price. Rendered as currency. */
	price?: number;
	/** Regular price, rendered struck through — also what the badge is derived from. */
	wasPrice?: number;
	/** ISO currency code used by the default formatter (default: `"USD"`). */
	currency?: string;
	/** BCP 47 locale used by the default formatter (default: `"en"`). */
	locale?: string;
	/**
	 * Replaces the default `Intl` formatter. Inject `useFormatCurrency` from
	 * `katanakit-js` to apply taxes or a shared formatting policy.
	 */
	formatPrice?: (amount: number) => string;
	/** Product or campaign image URL. */
	image?: string;
	/** Alt text for `image`; empty when the image is decorative. */
	imageAlt?: string;
	/** Anchored call to action. */
	cta?: BannerAction;
	/** Offer deadline as a `Date` or epoch milliseconds. Starts the countdown. */
	endsAt?: Date | number;
	/** Called once when the countdown reaches zero (synchronously at creation if already past). */
	onExpire?: () => void;
	/** Adds an accessible close button. */
	dismissible?: boolean;
	/** Called after the banner is dismissed. */
	onDismiss?: () => void;
	/** Overrides the region's accessible name (default: `title`, then `"Special offer"`). */
	ariaLabel?: string;
}

/** Text shown by a countdown that has run out. */
const EXPIRED_TEXT = "00:00:00";

/** Interval between countdown updates, in milliseconds. */
const TICK_MS = 1000;

/**
 * Live countdown per banner element.
 *
 * Held in a `WeakMap` so removing the node lets the whole entry be collected;
 * the interval itself is cleared on the first tick after the banner leaves the
 * document, on expiry, and on dismissal.
 */
interface Countdown {
	timer: ReturnType<typeof setInterval> | null;
	value: HTMLElement;
	endsAt: number;
	onExpire?: () => void;
	/** Whether the banner has ever been attached — see the tick guard below. */
	attached: boolean;
	expired: boolean;
}

/** Live countdowns by banner element. */
const countdowns = new WeakMap<HTMLElement, Countdown>();

/**
 * Pure class list for a banner.
 *
 * @param options - Layout, tone and dismissibility.
 * @returns The `banner` class list.
 *
 * @example
 * ```ts
 * bannerClass({ layout: "hero", tone: "danger" });
 * // "banner banner--hero banner--danger"
 * ```
 */
export function bannerClass(
	options: Pick<BannerOptions, "layout" | "tone" | "dismissible"> = {},
): string {
	const classes = [
		"banner",
		`banner--${options.layout ?? "card"}`,
		`banner--${options.tone ?? "info"}`,
	];
	if (options.dismissible) classes.push("banner--dismissible");
	return classes.join(" ");
}

function requireDom(api: string): Document {
	if (typeof document === "undefined") {
		throw new Error(`[KatanaUI] ${api}() needs a DOM; use bannerClass() for SSR markup.`);
	}
	return document;
}

/**
 * Builds the default currency formatter.
 *
 * @param currency - ISO code.
 * @param locale - BCP 47 tag.
 * @returns A formatter over `Intl.NumberFormat`.
 */
function defaultFormat(currency: string, locale: string): (amount: number) => string {
	return (amount) => new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
}

/**
 * Resolves the badge text.
 *
 * @param options - Caller options.
 * @returns The badge text, or `""` when nothing should render.
 */
function resolveBadge(options: BannerOptions): string {
	if (options.badge !== undefined) return options.badge;
	const { price, wasPrice } = options;
	if (price === undefined || wasPrice === undefined || wasPrice <= price) return "";
	return `-${Math.round((1 - price / wasPrice) * 100)}%`;
}

function pad(value: number): string {
	return String(value).padStart(2, "0");
}

/**
 * Builds the price row: the current price, then the regular one struck through.
 *
 * @param price - Current price.
 * @param wasPrice - Regular price, when there is a discount to show.
 * @param format - Resolved price formatter.
 * @returns The `banner__prices` element.
 */
function buildPrices(
	price: number,
	wasPrice: number | undefined,
	format: (amount: number) => string,
): HTMLParagraphElement {
	const prices = document.createElement("p");
	prices.className = "banner__prices";

	const now = document.createElement("strong");
	now.className = "banner__price";
	now.textContent = format(price);
	prices.append(now);

	if (wasPrice !== undefined) {
		// `<s>` is the semantic strike: the regular price is no longer accurate.
		const was = document.createElement("s");
		was.className = "banner__price banner__price--was";
		was.textContent = format(wasPrice);
		prices.append(was);
	}

	return prices;
}

/**
 * Formats a remaining duration as a countdown clock.
 *
 * @param ms - Milliseconds left, already clamped by the caller.
 * @returns `"HH:MM:SS"`, or `"Nd HH:MM:SS"` past a day.
 */
function formatCountdown(ms: number): string {
	const total = Math.max(0, Math.floor(ms / 1000));
	const days = Math.floor(total / 86_400);
	const hours = Math.floor((total % 86_400) / 3600);
	const minutes = Math.floor((total % 3600) / 60);
	const seconds = total % 60;
	const clock = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
	return days > 0 ? `${days}d ${clock}` : clock;
}

/**
 * Stops a banner's countdown and releases its registry entry.
 *
 * @param banner - The banner element.
 */
function stopCountdown(banner: HTMLElement): void {
	const entry = countdowns.get(banner);
	if (!entry) return;
	if (entry.timer) clearInterval(entry.timer);
	entry.timer = null;
	countdowns.delete(banner);
}

/**
 * Starts the countdown ticker.
 *
 * The first paint happens while the element is still detached — the factory
 * returns before anyone appends it — so the self-dispose guard tracks whether
 * the banner has ever been connected instead of testing `isConnected` blind:
 * a banner removed from the document stops on the next tick, while one that
 * has not been appended yet keeps running.
 *
 * @param banner - The banner element.
 * @param value - The element that shows the clock.
 * @param endsAt - Deadline in epoch milliseconds.
 * @param onExpire - Optional expiry callback.
 */
function startCountdown(
	banner: HTMLElement,
	value: HTMLElement,
	endsAt: number,
	onExpire?: () => void,
): void {
	const entry: Countdown = { timer: null, value, endsAt, onExpire, attached: false, expired: false };
	countdowns.set(banner, entry);

	const expire = () => {
		stopCountdown(banner);
		value.textContent = EXPIRED_TEXT;
		if (entry.expired) return;
		entry.expired = true;
		banner.classList.add("banner--expired");
		onExpire?.();
	};

	const tick = () => {
		if (banner.isConnected) entry.attached = true;
		else if (entry.attached) {
			// Detached after having been shown: nobody calls stop(), so the
			// ticker owns its own teardown rather than leaking an interval.
			stopCountdown(banner);
			return;
		}

		const remaining = entry.endsAt - Date.now();
		if (remaining <= 0) expire();
		else value.textContent = formatCountdown(remaining);
	};

	value.textContent = formatCountdown(endsAt - Date.now());
	if (endsAt - Date.now() <= 0) {
		expire();
		return;
	}
	entry.timer = setInterval(tick, TICK_MS);
}

/**
 * Creates a promotional banner for offers, discounts and sale prices.
 *
 * Prices arrive as numbers and are formatted with `Intl.NumberFormat`; inject
 * `formatPrice` to reuse `useFormatCurrency` from `katanakit-js` instead. With
 * `endsAt` the banner shows a live countdown that stops itself once the node
 * leaves the document.
 *
 * @param options - Layout, tone, copy, prices, countdown and dismissal.
 * @returns The banner element.
 * @throws {Error} Outside a DOM environment.
 *
 * @example
 * ```ts
 * document.body.append(
 *   useBanner({
 *     layout: "hero",
 *     tone: "danger",
 *     title: "Black Friday",
 *     badge: "-40%",
 *     price: 17.99,
 *     wasPrice: 29.99,
 *     currency: "EUR",
 *     locale: "es",
 *     cta: { label: "Shop now", href: "/sale" },
 *     endsAt: Date.now() + 7_200_000,
 *   }),
 * );
 * ```
 */
export function useBanner(options: BannerOptions = {}): HTMLElement {
	requireDom("useBanner");

	const layout = options.layout ?? "card";
	const format =
		options.formatPrice ?? defaultFormat(options.currency ?? "USD", options.locale ?? "en");

	const banner = document.createElement("article");
	banner.className = bannerClass(options);
	banner.setAttribute("role", "region");
	banner.setAttribute("aria-label", options.ariaLabel ?? options.title ?? "Special offer");

	if (options.image) {
		const media = document.createElement("div");
		media.className = "banner__media";
		const image = document.createElement("img");
		image.src = options.image;
		image.alt = options.imageAlt ?? "";
		// Offer art is usually above the fold, but a strip below it is not.
		image.loading = "lazy";
		media.append(image);
		banner.append(media);
	}

	const body = document.createElement("div");
	body.className = "banner__body";

	const badgeText = resolveBadge(options);
	if (badgeText) {
		const badge = document.createElement("span");
		badge.className = "banner__badge";
		badge.textContent = badgeText;
		body.append(badge);
	}

	if (options.title) {
		// The hero carries a page-level claim, so it earns an `h2`; a product
		// card sits under its section heading and stays at `h3`.
		const title = document.createElement(layout === "hero" ? "h2" : "h3");
		title.className = "banner__title";
		title.textContent = options.title;
		body.append(title);
	}

	if (options.subtitle) {
		const subtitle = document.createElement("p");
		subtitle.className = "banner__subtitle";
		subtitle.textContent = options.subtitle;
		body.append(subtitle);
	}

	if (options.price !== undefined) {
		body.append(buildPrices(options.price, options.wasPrice, format));
	}

	let countdownValue: HTMLElement | null = null;
	let endsAt = 0;
	if (options.endsAt !== undefined) {
		endsAt = options.endsAt instanceof Date ? options.endsAt.getTime() : options.endsAt;
		countdownValue = document.createElement("span");
		countdownValue.className = "banner__countdown-value";

		const countdown = document.createElement("p");
		countdown.className = "banner__countdown";
		countdown.setAttribute("role", "timer");
		// A clock that ticks every second must not be announced every second.
		countdown.setAttribute("aria-live", "off");
		countdown.setAttribute("aria-label", "Offer ends in");
		countdown.append(countdownValue);
		body.append(countdown);
	}

	if (options.cta) {
		const wrap = document.createElement("p");
		wrap.className = "banner__cta";
		const link = document.createElement("a");
		link.className = "btn btn--primary";
		link.href = options.cta.href;
		link.textContent = options.cta.label;
		wrap.append(link);
		body.append(wrap);
	}

	banner.append(body);

	if (countdownValue) {
		const progress = document.createElement("span");
		progress.className = "banner__progress";
		progress.setAttribute("aria-hidden", "true");
		// The bar is driven by CSS so it cannot drift from the page's paint
		// clock; the JS ticker only owns the digits.
		progress.style.setProperty("--katana-banner-countdown", `${Math.max(0, endsAt - Date.now())}ms`);
		banner.append(progress);
		startCountdown(banner, countdownValue, endsAt, options.onExpire);
	}

	if (options.dismissible) {
		const close = document.createElement("button");
		close.type = "button";
		close.className = "banner__close";
		close.setAttribute("aria-label", "Dismiss");
		close.textContent = "×";
		close.addEventListener("click", () => {
			stopCountdown(banner);
			banner.remove();
			options.onDismiss?.();
		});
		banner.append(close);
	}

	return banner;
}
