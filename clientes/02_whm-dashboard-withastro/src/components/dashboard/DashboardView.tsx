import { useState } from 'react';
import {
	AlertTriangle,
	ArrowDownToLine,
	CheckCircle2,
	Loader2,
	Sparkles,
	Truck,
} from 'lucide-react';
import { useI18n } from '../../i18n/LocaleProvider';
import type { CollectionsState } from '../../hooks/useCollections';
import { ai } from '../../lib/ai';
import { KpiCard } from './KpiCard';
import { useToast } from './Toast';

export function DashboardView({
	collections,
	canAi,
}: {
	collections: CollectionsState;
	canAi: boolean;
}) {
	const { S } = useI18n();
	const toast = useToast();
	const [report, setReport] = useState<string | null>(null);
	const [generating, setGenerating] = useState(false);

	const incoming = collections.inOrders.docs.length;
	const outgoing = collections.outOrders.docs.length;
	const critical = collections.inventory.docs.filter((item) => item.status === 'Crítico').length;
	const completed = collections.outOrders.docs.filter((order) => order.status === 'Completada').length;
	const fulfillment = outgoing > 0 ? Math.round((completed / outgoing) * 100) : 0;

	const generateReport = async () => {
		setGenerating(true);
		try {
			const summary = await ai.generate(
				`Resumí el estado operativo del almacén: ${collections.inventory.docs.length} SKUs en inventario, ${incoming} recepciones y ${outgoing} expediciones (${completed} completadas). Respondé breve, en español y con datos puntuales.`,
			);
			setReport(summary);
		} catch {
			toast(S.aiNotConfigured, 'info');
		} finally {
			setGenerating(false);
		}
	};

	return (
		<div className="mx-auto max-w-7xl space-y-6 animate-fade-in">
			<h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{S.dashboardTitle}</h2>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<KpiCard title={S.kpiIncoming} value={incoming} icon={ArrowDownToLine} />
				<KpiCard title={S.kpiOutgoing} value={outgoing} icon={Truck} />
				<KpiCard title={S.kpiCritical} value={critical} icon={AlertTriangle} tone="danger" />
				<KpiCard
					title={S.kpiFulfillment}
					value={`${fulfillment}%`}
					subtitle={S.fulfillmentSubtitle(completed, outgoing)}
					icon={CheckCircle2}
					tone="success"
				/>
			</div>

			{canAi && (
				<div className="relative overflow-hidden rounded-2xl bg-indigo-900 p-6 text-white">
					<div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-indigo-500/30 blur-2xl" aria-hidden="true" />
					<h3 className="mb-4 flex items-center text-xl font-bold">
						<Sparkles className="mr-2 text-yellow-400" />
						{S.aiReportTitle}
					</h3>
					<button
						type="button"
						onClick={generateReport}
						disabled={generating || !ai.isConfigured()}
						className="rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold transition hover:bg-white/30 disabled:opacity-50"
					>
						{generating && <Loader2 size={16} className="mr-2 inline animate-spin" />}
						{generating ? S.aiGenerating : S.aiReportGenerate}
					</button>
					{!ai.isConfigured() && <p className="mt-3 text-sm text-indigo-200">{S.aiReportHint}</p>}
					{report && (
						<p className="mt-4 rounded-lg bg-black/20 p-4 text-sm leading-relaxed">{report}</p>
					)}
				</div>
			)}
		</div>
	);
}
