import {
	ViewportUtils,
	getViewportSize,
	scrollToTop,
	scrollToElement,
	onVisibilityChange,
} from "./utils/viewport.utils";

// Viewport info
const { width, height } = getViewportSize();
console.log(`${width}x${height}`);

// Scroll operations
scrollToTop();
scrollToElement("#about", { behavior: "smooth", block: "start" });
ViewportUtils.scrollToBottom();

// Scroll progress (for progress bars)
const progress = ViewportUtils.getScrollProgress();
progressBar.style.width = `${progress * 100}%`;

// Accessibility-aware (respects reduced motion automatically)
ViewportUtils.scrollToElement("#section");

// Media queries
if (ViewportUtils.matchesMedia("(min-width: 1024px)")) {
	console.log("Desktop layout");
}

// Visibility API (pause videos when tab is hidden)
const unsub = onVisibilityChange((isVisible) => {
	if (!isVisible) video.pause();
	else video.play();
});

// Temporary title (e.g., "3 new messages")
ViewportUtils.setTempTitle("(3) New Messages", 5000);

// Focus management
ViewportUtils.focusElement("#search-input");
ViewportUtils.blurActiveElement();

// Fullscreen
await ViewportUtils.requestFullscreen(videoElement);
await ViewportUtils.exitFullscreen();