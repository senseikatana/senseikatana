import fs from "node:fs";
import path from "node:path";

export type ReportAction = "passed" | "onTime" | "late" | "early" | "notPassed" | "cancelled";

export const REPORT_ACTIONS: readonly ReportAction[] = [
	"passed",
	"onTime",
	"late",
	"early",
	"notPassed",
	"cancelled",
];

export const NEGATIVE_ACTIONS: ReadonlySet<ReportAction> = new Set<ReportAction>([
	"late",
	"early",
	"notPassed",
	"cancelled",
]);

export const ESCALATION_THRESHOLD = 3;

export interface BusReport {
	id: string;
	lineId: string;
	stopId?: string;
	action: ReportAction;
	minutesLate?: number;
	comment?: string;
	createdAt: string;
}

export interface BusReview {
	id: string;
	lineId: string;
	stars: number;
	comment?: string;
	createdAt: string;
}

export interface Escalation {
	id: string;
	lineId: string;
	threshold: number;
	createdAt: string;
	resolved?: boolean;
}

export interface LineStats {
	lineId: string;
	total: number;
	negative: number;
	onTimeRate: number;
	threshold: number;
	remaining: number;
	escalated: boolean;
}

interface StoreData {
	reports: BusReport[];
	reviews: BusReview[];
	escalations: Escalation[];
}

const DATA_FILE =
	process.env.BUS_TRACKING_DATA_FILE ??
	path.join(process.cwd(), ".data", "bus-tracking.json");

function load(): StoreData {
	try {
		const raw = fs.readFileSync(DATA_FILE, "utf8");
		const parsed = JSON.parse(raw) as Partial<StoreData>;
		return {
			reports: parsed.reports ?? [],
			reviews: parsed.reviews ?? [],
			escalations: parsed.escalations ?? [],
		};
	} catch {
		return { reports: [], reviews: [], escalations: [] };
	}
}

function save(data: StoreData): void {
	fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
	fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function computeStats(lineId: string, data: StoreData): LineStats {
	const lineReports = data.reports.filter((r) => r.lineId === lineId);
	const total = lineReports.length;
	const negative = lineReports.filter((r) => NEGATIVE_ACTIONS.has(r.action)).length;
	const positive = lineReports.filter((r) => r.action === "onTime").length;
	const escalated = data.escalations.some((e) => e.lineId === lineId && e.resolved !== true);

	return {
		lineId,
		total,
		negative,
		onTimeRate: total > 0 ? Math.round((positive / total) * 100) : 100,
		threshold: ESCALATION_THRESHOLD,
		remaining: Math.max(0, ESCALATION_THRESHOLD - negative),
		escalated,
	};
}

export function getLineStats(lineId: string): LineStats {
	return computeStats(lineId, load());
}

export function listReports(lineId?: string): BusReport[] {
	const { reports } = load();
	if (!lineId) return reports;
	return reports.filter((r) => r.lineId === lineId);
}

export function listReviews(lineId?: string): BusReview[] {
	const { reviews } = load();
	if (!lineId) return reviews;
	return reviews.filter((r) => r.lineId === lineId);
}

export function getEscalation(lineId: string): Escalation | undefined {
	return load().escalations.find((e) => e.lineId === lineId && e.resolved !== true);
}

export interface AddReportInput {
	lineId: string;
	stopId?: string;
	action: ReportAction;
	minutesLate?: number;
	comment?: string;
}

export function addReport(input: AddReportInput): {
	report: BusReport;
	stats: LineStats;
	escalation: Escalation | null;
} {
	const data = load();

	const report: BusReport = {
		id: crypto.randomUUID(),
		lineId: input.lineId,
		stopId: input.stopId,
		action: input.action,
		minutesLate: input.minutesLate,
		comment: input.comment,
		createdAt: new Date().toISOString(),
	};
	data.reports.push(report);

	const lineReports = data.reports.filter((r) => r.lineId === input.lineId);
	const negative = lineReports.filter((r) => NEGATIVE_ACTIONS.has(r.action)).length;

	let escalation =
		data.escalations.find((e) => e.lineId === input.lineId && e.resolved !== true) ?? null;

	if (negative >= ESCALATION_THRESHOLD && !escalation) {
		escalation = {
			id: crypto.randomUUID(),
			lineId: input.lineId,
			threshold: ESCALATION_THRESHOLD,
			createdAt: new Date().toISOString(),
		};
		data.escalations.push(escalation);
	}

	save(data);

	return { report, stats: computeStats(input.lineId, data), escalation };
}

export interface AddReviewInput {
	lineId: string;
	stars: number;
	comment?: string;
}

export function addReview(input: AddReviewInput): BusReview {
	const data = load();
	const review: BusReview = {
		id: crypto.randomUUID(),
		lineId: input.lineId,
		stars: input.stars,
		comment: input.comment,
		createdAt: new Date().toISOString(),
	};
	data.reviews.push(review);
	save(data);
	return review;
}
