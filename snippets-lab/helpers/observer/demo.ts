import { LOGGER } from "../logs/logger.service";
import { ObserverService } from "./observer.service";
import { lazyLoaderService, observerService } from "./utils/observer.utils";


const { create: OBSERVER_CREATE, observeAll: OBSERVE_ALL, observe: OBSERVE }: ObserverService = ObserverService.getInstance()



// Create a custom observer for fade-in animations
OBSERVER_CREATE(
	"fade-in",
	({ target }: EventListener) => {
		target.classList.toggle("visible");
	},
	{ threshold: 0.2 },
);

OBSERVE("fade-in", "#hero");
OBSERVE("fade-in", "#about");
OBSERVE_ALL("fade-in", ".card");

// Create another observer for analytics tracking
observerService.create("track-view", (entry) => {
	LOGGER(`View: ${entry.target.id}`, "info");
});
observerService.observe("track-view", "#promo-banner");

// Lazy load images for different sections
lazyLoaderService.init("pokemon-list", ".pokemon-card img", "300px");
lazyLoaderService.init("blog-posts", ".post-cover img");

// Selective cleanup
observerService.disconnect("track-view");
lazyLoaderService.stop("pokemon-list");

// Full cleanup (e.g., on SPA route change or component unmount)
observerService.disconnectAll();
lazyLoaderService.stopAll();