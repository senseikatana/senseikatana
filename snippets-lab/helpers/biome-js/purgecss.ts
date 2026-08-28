// postcss.config.mjs
import purgecss from "@fullhuman/postcss-purgecss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import tailwindcss from "tailwindcss";

const isProduction = process.env.NODE_ENV === "production";

const plugins = [
	tailwindcss(),
	autoprefixer(),
];

if (isProduction) {
	plugins.push(
		purgecss({
			content: [
				"./src/**/*.html",
				"./src/**/*.js",
				"./src/**/*.ts",
				"./src/**/*.svelte",
			],
			defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
		}),
		cssnano({ preset: "default" })
	);
}

export default {
	plugins,
};