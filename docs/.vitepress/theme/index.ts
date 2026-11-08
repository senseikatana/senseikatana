import DefaultTheme from "vitepress/theme";

import "@katanakit/ui/styles.css";
import { installActiveNav } from "./active-nav";
import ComponentContract from "./components/ComponentContract.vue";
import HomeSections from "./components/HomeSections.vue";
import HyperUiShowcase from "./components/HyperUiShowcase.vue";
import SwaggerViewer from "./components/SwaggerViewer.vue";
import Layout from "./Layout.vue";
import TailwindShowcase from "./components/TailwindShowcase.vue";
import "./style.css";

/**
 * Mirrors VitePress' dark mode into the `data-theme` contract that
 * katanakit-css and the KatanaKit `ThemeService` use, so every component demo
 * follows the site theme toggle.
 */
export default {
	extends: DefaultTheme,
	Layout,
	enhanceApp({ app, router }) {
		app.component("ComponentContract", ComponentContract);
		app.component("HyperUiShowcase", HyperUiShowcase);
		app.component("SwaggerViewer", SwaggerViewer);
		app.component("TailwindShowcase", TailwindShowcase);
		app.component("HomeSections", HomeSections);
		if (typeof document === "undefined") return;
		installActiveNav(router);
		const root = document.documentElement;
		const sync = () => {
			root.dataset.theme = root.classList.contains("dark") ? "dark" : "light";
		};
		sync();
		new MutationObserver(sync).observe(root, {
			attributes: true,
			attributeFilter: ["class"],
		});
	},
};
