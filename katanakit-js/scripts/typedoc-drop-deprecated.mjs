// @ts-check
import { Converter } from "typedoc";

/**
 * Keeps `@deprecated` symbols out of the API reference.
 *
 * TypeDoc renders them struck-through with a "Deprecated" section, which is
 * noise on a docs site whose job is to point readers at the replacement
 * (`@deprecated Use {@link X}` already says that in the source comment).
 *
 * Mirrors TypeDoc's own `@hidden` handling: prune the project on
 * `EVENT_RESOLVE_BEGIN`, before links resolve and before typedoc-plugin-markdown
 * builds the module pages and `typedoc-sidebar.json`.
 *
 * @param {import("typedoc").Application} app
 */
export function load(app) {
	app.converter.on(Converter.EVENT_RESOLVE_BEGIN, (context) => {
		const project = context.project;
		const doomed = new Set();

		for (const reflection of Object.values(project.reflections)) {
			if (reflection.isDeprecated()) {
				doomed.add(reflection);
			}

			// A declaration whose every signature is deprecated is struck through
			// as a whole — drop the container instead of its individual overloads.
			const signatures =
				/** @type {import("typedoc").DeclarationReflection} */ (reflection).getNonIndexSignatures?.() ??
				[];
			if (signatures.length > 0 && signatures.every((signature) => signature.isDeprecated())) {
				doomed.add(reflection);
			}
		}

		const underDoomedParent = (reflection) => {
			for (let parent = reflection.parent; parent; parent = parent.parent) {
				if (doomed.has(parent)) return true;
			}
			return false;
		};

		let removed = 0;
		for (const reflection of doomed) {
			if (underDoomedParent(reflection)) continue;
			project.removeReflection(reflection);
			removed++;
		}

		if (removed > 0) {
			console.log(`typedoc: dropped ${removed} @deprecated symbol(s) from the API reference`);
		}
	});
}
