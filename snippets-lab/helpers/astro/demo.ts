// Import singleton instance
import { astroUtils } from "./utils/astro.utils";

// Generate paths from collection
export async function getStaticPaths() {
	return astroUtils.getStaticPaths(getCollection, "blog", {
		param: "slug",
		valueFrom: (entry) => entry.slug,
		propsFrom: (entry) => entry,
	});
}

// Find entry by slug
const post = astroUtils.findEntry(posts, "hello-world");

// Generate pagination
const pages = astroUtils.generatePagination(allPosts, 10, "page");

// Generate paths from simple values
const tagPaths = astroUtils.pathsFromValues(["javascript", "typescript"], "tag");

// Extract unique tags from posts
const allTags = astroUtils.extractUniqueValues(posts, (post) => post.data.tags);