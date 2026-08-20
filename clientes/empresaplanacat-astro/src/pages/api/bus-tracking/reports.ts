import type { APIRoute } from "astro";
import {
	addReport,
	getLineStats,
	listReports,
	REPORT_ACTIONS,
	type ReportAction,
} from "../../../lib/tracking-store";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
	const lineId = (url.searchParams.get("lineId") ?? "").trim();
	return Response.json({
		reports: listReports(lineId || undefined),
		stats: lineId ? getLineStats(lineId) : null,
	});
};

export const POST: APIRoute = async ({ request }) => {
	let body: Record<string, unknown>;
	try {
		body = (await request.json()) as Record<string, unknown>;
	} catch {
		return Response.json({ error: "invalid_body" }, { status: 400 });
	}

	const lineId = typeof body.lineId === "string" ? body.lineId.trim() : "";
	const action = typeof body.action === "string" ? body.action : "";
	const stopId = typeof body.stopId === "string" ? body.stopId.trim() : undefined;
	const minutesLate = typeof body.minutesLate === "number" && body.minutesLate >= 0 ? Math.round(body.minutesLate) : undefined;
	const comment = typeof body.comment === "string" ? body.comment.slice(0, 500) : undefined;

	if (!lineId) {
		return Response.json({ error: "line_id_required" }, { status: 400 });
	}
	if (!REPORT_ACTIONS.includes(action as ReportAction)) {
		return Response.json({ error: "invalid_action" }, { status: 400 });
	}

	const result = addReport({ lineId, stopId, action: action as ReportAction, minutesLate, comment });
	return Response.json(result, { status: 201 });
};
