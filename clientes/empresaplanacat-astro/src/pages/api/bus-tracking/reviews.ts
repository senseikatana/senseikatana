import type { APIRoute } from "astro";
import { addReview, listReviews } from "../../../lib/tracking-store";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
	const lineId = (url.searchParams.get("lineId") ?? "").trim();
	return Response.json({ reviews: listReviews(lineId || undefined) });
};

export const POST: APIRoute = async ({ request }) => {
	let body: Record<string, unknown>;
	try {
		body = (await request.json()) as Record<string, unknown>;
	} catch {
		return Response.json({ error: "invalid_body" }, { status: 400 });
	}

	const lineId = typeof body.lineId === "string" ? body.lineId.trim() : "";
	const stars = typeof body.stars === "number" ? Math.round(body.stars) : 0;
	const comment = typeof body.comment === "string" ? body.comment.slice(0, 500) : undefined;

	if (!lineId) {
		return Response.json({ error: "line_id_required" }, { status: 400 });
	}
	if (stars < 1 || stars > 5) {
		return Response.json({ error: "invalid_stars" }, { status: 400 });
	}

	const review = addReview({ lineId, stars, comment });
	return Response.json({ review }, { status: 201 });
};
