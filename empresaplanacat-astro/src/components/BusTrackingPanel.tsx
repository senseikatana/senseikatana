import { useEffect, useState } from "react";
import type { BusTracking } from "../config/i18n/types";
import type { LineStats, ReportAction } from "../lib/tracking-store";

interface StopInfo {
	id: string;
	name: string;
	time: string;
}

interface Props {
	lineId: string;
	lineLabel: string;
	stops: StopInfo[];
	t: BusTracking;
}

interface ReportResult {
	report: { id: string; action: ReportAction; createdAt: string };
	stats: LineStats;
	escalation: { id: string; threshold: number; createdAt: string } | null;
}

const ACTIONS: { value: ReportAction; icon: string }[] = [
	{ value: "passed", icon: "check_circle" },
	{ value: "onTime", icon: "schedule" },
	{ value: "late", icon: "schedule" },
	{ value: "early", icon: "schedule" },
	{ value: "notPassed", icon: "cancel" },
	{ value: "cancelled", icon: "block" },
];

const ACTION_STYLES: Record<ReportAction, string> = {
	passed: "border-deep-navy/30 text-deep-navy hover:bg-deep-navy hover:text-on-primary",
	onTime: "border-coastal-teal/40 text-on-secondary-container hover:bg-secondary-container",
	late: "border-error/30 text-error hover:bg-error hover:text-on-error",
	early: "border-on-tertiary-container/40 text-on-tertiary-container hover:bg-tertiary-container",
	notPassed: "border-error/30 text-error hover:bg-error hover:text-on-error",
	cancelled: "border-outline text-on-surface-variant hover:bg-surface-container-high",
};

export default function BusTrackingPanel({ lineId, lineLabel, stops, t }: Props) {
	const [stopId, setStopId] = useState(stops[0]?.id ?? "");
	const [action, setAction] = useState<ReportAction | null>(null);
	const [minutesLate, setMinutesLate] = useState("");
	const [comment, setComment] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [result, setResult] = useState<ReportResult | null>(null);
	const [stats, setStats] = useState<LineStats | null>(null);

	const [stars, setStars] = useState(0);
	const [reviewComment, setReviewComment] = useState("");
	const [reviewSubmitting, setReviewSubmitting] = useState(false);
	const [reviewSubmitted, setReviewSubmitted] = useState(false);

	useEffect(() => {
		let cancelled = false;
		fetch(`/api/bus-tracking/reports?lineId=${encodeURIComponent(lineId)}`)
			.then((res) => res.json())
			.then((data: { stats: LineStats | null }) => {
				if (!cancelled && data.stats) setStats(data.stats);
			})
			.catch(() => {});
		return () => {
			cancelled = true;
		};
	}, [lineId]);

	const selectedStop = stops.find((s) => s.id === stopId) ?? stops[0];

	async function submitReport() {
		if (!action) {
			setError(t.feedback.selectIssue);
			return;
		}
		setSubmitting(true);
		setError(null);
		try {
			const res = await fetch("/api/bus-tracking/reports", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					lineId,
					stopId: selectedStop?.id,
					action,
					minutesLate: minutesLate ? Number(minutesLate) : undefined,
					comment: comment || undefined,
				}),
			});
			if (!res.ok) {
				setError("error");
				return;
			}
			const data = (await res.json()) as ReportResult;
			setResult(data);
			setStats(data.stats);
			setAction(null);
			setMinutesLate("");
			setComment("");
		} catch {
			setError("error");
		} finally {
			setSubmitting(false);
		}
	}

	async function submitReview() {
		if (stars < 1) return;
		setReviewSubmitting(true);
		try {
			await fetch("/api/bus-tracking/reviews", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					lineId,
					stars,
					comment: reviewComment || undefined,
				}),
			});
			setReviewSubmitted(true);
			setStars(0);
			setReviewComment("");
		} finally {
			setReviewSubmitting(false);
		}
	}

	const negativeCount = stats?.negative ?? 0;
	const threshold = stats?.threshold ?? 3;
	const escalated = Boolean(stats?.escalated || result?.escalation);

	return (
		<div className="max-w-2xl mx-auto space-y-stack-lg">
			<section className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 ambient-shadow p-6">
				<div className="flex items-center gap-3 mb-2">
					<span className="material-symbols-outlined text-deep-navy">directions_bus</span>
					<h2 className="font-headline-md text-headline-md text-deep-navy">{t.title}</h2>
				</div>
				<p className="font-body-md text-body-md text-on-surface-variant mb-6">{t.subtitle}</p>

				<div className="flex flex-col md:flex-row gap-stack-md mb-6">
					<div className="flex-1">
						<span className="font-label-md text-label-md text-on-surface-variant uppercase">{t.line}</span>
						<p className="font-headline-md text-headline-md text-on-surface">{lineLabel}</p>
					</div>
					<div className="flex-1">
						<span className="font-label-md text-label-md text-on-surface-variant uppercase">{t.stop}</span>
						<select
							value={stopId}
							onChange={(e) => setStopId(e.target.value)}
							className="w-full mt-1 px-3 py-2 rounded border border-outline-variant bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:border-coastal-teal focus:ring-1 focus:ring-coastal-teal"
						>
							{stops.map((stop) => (
								<option key={stop.id} value={stop.id}>
									{stop.name} — {t.scheduled} {stop.time}
								</option>
							))}
						</select>
					</div>
				</div>

				<p className="font-label-md text-label-md text-on-surface-variant mb-3">{t.feedback.selectIssue}</p>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
					{ACTIONS.map(({ value, icon }) => (
						<button
							key={value}
							type="button"
							onClick={() => setAction(action === value ? null : value)}
							className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-label-md transition-colors ${
								action === value
									? "bg-deep-navy text-on-primary border-deep-navy"
									: ACTION_STYLES[value]
							}`}
						>
							<span className="material-symbols-outlined text-[18px]">{icon}</span>
							{t.actions[value]}
						</button>
					))}
				</div>

				{(action === "late" || action === "early") && (
					<div className="mt-4">
						<label className="font-label-md text-label-md text-on-surface-variant" htmlFor="minutes-late">
							{t.feedback.minutesLate}
						</label>
						<input
							id="minutes-late"
							type="number"
							min={0}
							value={minutesLate}
							onChange={(e) => setMinutesLate(e.target.value)}
							className="mt-1 w-full md:w-40 px-3 py-2 rounded border border-outline-variant bg-surface-container-lowest focus:border-coastal-teal focus:ring-1 focus:ring-coastal-teal"
						/>
					</div>
				)}

				<div className="mt-4">
					<label className="font-label-md text-label-md text-on-surface-variant" htmlFor="report-comment">
						{t.feedback.comment}
					</label>
					<textarea
						id="report-comment"
						rows={2}
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder={t.feedback.commentPlaceholder}
						className="mt-1 w-full px-3 py-2 rounded border border-outline-variant bg-surface-container-lowest focus:border-coastal-teal focus:ring-1 focus:ring-coastal-teal"
					/>
				</div>

				{error && <p className="mt-3 text-error font-body-md text-body-md">{error}</p>}

				<button
					type="button"
					disabled={submitting}
					onClick={submitReport}
					className="mt-4 w-full md:w-auto bg-energetic-orange text-white font-button text-button px-8 py-3 rounded hover:opacity-90 transition-opacity disabled:opacity-50 min-h-[48px]"
				>
					{submitting ? "…" : t.feedback.send}
				</button>

				{result && (
					<div className="mt-4 p-4 rounded-lg bg-secondary-container/30 border border-coastal-teal/30">
						<p className="font-headline-md text-headline-md text-on-secondary-container">{t.feedback.thanks}</p>
						<p className="font-body-md text-body-md text-on-surface-variant">{t.feedback.thanksDesc}</p>
					</div>
				)}

				{stats && (
					<div className="mt-6 border-t border-outline-variant/30 pt-4">
						<div className="flex items-center justify-between mb-2">
							<span className="font-label-md text-label-md text-on-surface-variant">
								{t.stats.punctuality} · {t.stats.onTimeRate}: {stats.onTimeRate}%
							</span>
							<span className="font-label-md text-label-md text-deep-navy">
								{negativeCount}/{threshold}
							</span>
						</div>
						<div className="h-2 rounded-full bg-surface-container overflow-hidden">
							<div
								className="h-full rounded-full transition-all"
								style={{
									width: `${Math.min(100, (negativeCount / threshold) * 100)}%`,
									backgroundColor: escalated ? "#ba1a1a" : "#EB8E02",
								}}
							/>
						</div>
						<p className="mt-2 font-body-md text-body-md text-on-surface-variant">
							{escalated
								? t.alerts.notifiedBody
								: `${t.alerts.strikesLeft}: ${Math.max(0, threshold - negativeCount)}`}
						</p>
						{escalated && (
							<div className="mt-3 p-4 rounded-lg bg-error-container/60 border border-error/30">
								<p className="font-headline-md text-headline-md text-on-error-container">{t.alerts.notifiedTitle}</p>
								<ul className="mt-2 space-y-1 font-body-md text-body-md text-on-error-container">
									<li>· {t.alerts.coordinatorNotified}</li>
									<li>· {t.alerts.companyNotified}</li>
								</ul>
							</div>
						)}
					</div>
				)}
			</section>

			<section className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 ambient-shadow p-6">
				<div className="flex items-center gap-3 mb-2">
					<span className="material-symbols-outlined text-deep-navy">star</span>
					<h2 className="font-headline-md text-headline-md text-deep-navy">{t.review.title}</h2>
				</div>
				<p className="font-body-md text-body-md text-on-surface-variant mb-6">{t.review.subtitle}</p>

				<div className="flex items-center gap-1 mb-4">
					{[1, 2, 3, 4, 5].map((value) => (
						<button
							key={value}
							type="button"
							aria-label={`${value} ${t.review.stars}`}
							onClick={() => setStars(value)}
							className="p-1 text-energetic-orange hover:scale-110 transition-transform"
						>
							<span className="material-symbols-outlined text-[28px]">
								{value <= stars ? "star" : "star_outline"}
							</span>
						</button>
					))}
				</div>

				<textarea
					rows={2}
					value={reviewComment}
					onChange={(e) => setReviewComment(e.target.value)}
					placeholder={t.feedback.commentPlaceholder}
					className="w-full px-3 py-2 rounded border border-outline-variant bg-surface-container-lowest focus:border-coastal-teal focus:ring-1 focus:ring-coastal-teal"
				/>

				<button
					type="button"
					disabled={stars < 1 || reviewSubmitting}
					onClick={submitReview}
					className="mt-4 w-full md:w-auto bg-deep-navy text-white font-button text-button px-8 py-3 rounded hover:opacity-90 transition-opacity disabled:opacity-50 min-h-[48px]"
				>
					{t.review.submit}
				</button>

				{reviewSubmitted && (
					<p className="mt-4 font-body-md text-body-md text-on-secondary-container bg-secondary-container/30 border border-coastal-teal/30 rounded-lg p-4">
						{t.review.thanks}
					</p>
				)}
			</section>
		</div>
	);
}
