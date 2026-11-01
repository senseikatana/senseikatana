// @vitest-environment jsdom
import { describe, expect, it } from "vitest";

import { cardClass, useCard } from "../src/index";

describe("cardClass", () => {
	it("toggles the elevated modifier", () => {
		expect(cardClass()).toBe("card");
		expect(cardClass({ elevated: true })).toBe("card card--elevated");
	});
});

describe("useCard", () => {
	it("renders header, body children and footer", () => {
		const card = useCard({ title: "Revenue", children: ["$12,400"], footer: "Updated now" });

		expect(card.tagName).toBe("ARTICLE");
		expect(card.querySelector(".card__title")?.textContent).toBe("Revenue");
		expect(card.querySelector(".card__body")?.textContent).toBe("$12,400");
		expect(card.querySelector(".card__footer")?.textContent).toBe("Updated now");
	});

	it("accepts nodes as children", () => {
		const child = document.createElement("span");
		child.textContent = "Node child";

		const card = useCard({ children: [child] });

		expect(card.querySelector(".card__body span")?.textContent).toBe("Node child");
	});
});
