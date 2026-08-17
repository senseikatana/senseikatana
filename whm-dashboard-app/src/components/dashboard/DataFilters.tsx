import { useEffect, useState } from 'react';
import { ChevronDown, Filter, Search, X } from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';
import type { FilterState } from '../../hooks/useFilters';
import { useI18n } from '../../i18n/LocaleProvider';
import type { FieldDef } from '../../types';

interface DataFiltersProps {
	fields: readonly FieldDef[];
	filters: FilterState;
	activeCount: number;
	onQuery: (value: string) => void;
	onSelect: (key: string, value: string) => void;
	onNumber: (key: string, part: 'min' | 'max', value: string) => void;
	onClear: () => void;
}

const INPUT_BASE =
	'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:focus:ring-indigo-900/40';

export function DataFilters({
	fields,
	filters,
	activeCount,
	onQuery,
	onSelect,
	onNumber,
	onClear,
}: DataFiltersProps) {
	const { S } = useI18n();
	const isMobile = useIsMobile();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (isMobile) setOpen(false);
	}, [isMobile]);

	const labelOf = (field: FieldDef): string => S.fieldLabels[field.key] ?? field.label;
	const selectFields = fields.filter((field) => field.type === 'select');
	const numberFields = fields.filter((field) => field.type === 'number');

	return (
		<div className="border-b border-gray-200 bg-gray-50/50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/20">
			{isMobile && (
				<button
					type="button"
					onClick={() => setOpen((prev) => !prev)}
					aria-expanded={open}
					className="flex w-full items-center gap-2 rounded-lg px-1 py-1 text-sm font-bold text-gray-700 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300"
				>
					<Filter size={15} />
					{S.filters}
					{activeCount > 0 && (
						<span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white">
							{activeCount}
						</span>
					)}
					<ChevronDown size={15} className={`ml-auto transition-transform ${open ? 'rotate-180' : ''}`} />
				</button>
			)}

			<div className={`${isMobile && !open ? 'hidden' : ''} mt-1 flex flex-wrap items-center gap-2`}>
				{!isMobile && (
					<span className="flex items-center gap-1.5 pr-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
						<Filter size={14} />
						{S.filters}
						{activeCount > 0 && (
							<span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white">
								{activeCount}
							</span>
						)}
					</span>
				)}

				<div className="relative min-w-[180px] flex-1">
					<Search
						size={15}
						className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
					/>
					<input
						type="search"
						value={filters.query}
						onChange={(event) => onQuery(event.target.value)}
						placeholder={S.search}
						aria-label={S.search}
						className={`${INPUT_BASE} pl-9`}
					/>
				</div>

				{selectFields.map((field) => (
					<select
						key={field.key}
						value={filters.selects[field.key] ?? ''}
						onChange={(event) => onSelect(field.key, event.target.value)}
						aria-label={`${labelOf(field)} · ${S.all}`}
						className={`${INPUT_BASE} w-auto min-w-[130px]`}
					>
						<option value="">
							{labelOf(field)} · {S.all}
						</option>
						{field.options?.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				))}

				{numberFields.map((field) => (
					<div key={field.key} className="flex items-center gap-1.5">
						<input
							type="number"
							value={filters.numbers[field.key]?.min ?? ''}
							onChange={(event) => onNumber(field.key, 'min', event.target.value)}
							placeholder={`${labelOf(field)} ${S.min}`}
							aria-label={`${labelOf(field)} ${S.min}`}
							className={`${INPUT_BASE} w-28`}
						/>
						<span className="text-gray-400 dark:text-slate-500">–</span>
						<input
							type="number"
							value={filters.numbers[field.key]?.max ?? ''}
							onChange={(event) => onNumber(field.key, 'max', event.target.value)}
							placeholder={`${labelOf(field)} ${S.max}`}
							aria-label={`${labelOf(field)} ${S.max}`}
							className={`${INPUT_BASE} w-28`}
						/>
					</div>
				))}

				{activeCount > 0 && (
					<button
						type="button"
						onClick={onClear}
						className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
					>
						<X size={14} />
						{S.clearFilters}
					</button>
				)}
			</div>
		</div>
	);
}
