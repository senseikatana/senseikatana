import { useEffect, useMemo, useState, type SyntheticEvent } from 'react';
import {
	ArrowDown,
	ArrowUp,
	CheckSquare,
	Dices,
	Edit,
	Loader2,
	Plus,
	Sparkles,
	Square,
	Trash2,
} from 'lucide-react';
import type { AppStore } from '../../data/store';
import { SUGGESTIONS } from '../../data/suggestions';
import { useI18n } from '../../i18n/LocaleProvider';
import { ai } from '../../lib/ai';
import { generateFieldValue } from '../../lib/generators';
import { extractJson } from '../../lib/json';
import { listNutProducts } from '../../lib/kittFiles';
import type { CollectionKey, Doc, FieldDef } from '../../types';
import type { CollectionsState, CollectionState } from '../../hooks/useCollections';
import { useFilters } from '../../hooks/useFilters';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useSort } from '../../hooks/useSort';
import { DataFilters } from './DataFilters';
import { Modal } from './Modal';
import { StatusBadge } from './StatusBadge';
import { useToast } from './Toast';

interface CrudViewProps {
	entity: CollectionKey;
	title: string;
	store: AppStore;
	collection: CollectionState;
	allCollections: CollectionsState;
	fields: readonly FieldDef[];
	canInjectMock: boolean;
	onInjectMock: (entity: CollectionKey, count: number) => Promise<void>;
	canEdit: boolean;
	canDelete: boolean;
}

type ConfirmState = { mode: 'single' | 'batch'; docId?: string };

const BADGE_FIELDS = new Set(['status', 'type']);

const INPUT_BASE =
	'w-full rounded-lg border bg-white p-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:bg-slate-800 dark:text-gray-100 dark:focus:ring-indigo-900/40';

export function CrudView({
	entity,
	title,
	store,
	collection,
	allCollections,
	fields,
	canInjectMock,
	onInjectMock,
	canEdit,
	canDelete,
}: CrudViewProps) {
	const { S } = useI18n();
	const toast = useToast();
	const isMobile = useIsMobile();
	const [modalOpen, setModalOpen] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [form, setForm] = useState<Record<string, unknown>>({});
	const [selected, setSelected] = useState<string[]>([]);
	const [confirm, setConfirm] = useState<ConfirmState | null>(null);
	const [saving, setSaving] = useState(false);
	const [aiFilling, setAiFilling] = useState(false);
	const [injecting, setInjecting] = useState(false);
	const [nutProducts, setNutProducts] = useState<string[]>([]);

	const { docs, loading, error } = collection;
	const { filteredDocs, filters, setQuery, setSelect, setNumber, clear, activeCount } = useFilters(
		docs,
		fields,
	);
	const { sortedDocs, sortKey, direction, toggleSort } = useSort(filteredDocs, fields);
	const selectedAll = sortedDocs.length > 0 && selected.length === sortedDocs.length;

	const labelOf = (field: FieldDef): string => S.fieldLabels[field.key] ?? field.label;

	const errors = useMemo(() => {
		const result: Record<string, string> = {};
		for (const field of fields) {
			const value = form[field.key];
			const isEmpty =
				value === undefined ||
				value === null ||
				value === '' ||
				(typeof value === 'number' && Number.isNaN(value));
			if (field.required && isEmpty && !(field.auto && !editingId)) {
				result[field.key] = S.validationRequired(labelOf(field));
				continue;
			}
			if (
				field.type === 'number' &&
				field.min !== undefined &&
				typeof value === 'number' &&
				!Number.isNaN(value) &&
				value < field.min
			) {
				result[field.key] = S.validationMin(labelOf(field), field.min);
			}
		}
		return result;
	}, [form, fields, editingId, S]);

	const hasErrors = Object.keys(errors).length > 0;

	useEffect(() => {
		if (!modalOpen || entity !== 'inventory') return;
		let cancelled = false;
		void listNutProducts().then((products) => {
			if (!cancelled) setNutProducts(products);
		});
		return () => {
			cancelled = true;
		};
	}, [modalOpen, entity]);

	const suggestions = useMemo(() => {
		const result: Record<string, string[]> = {};
		for (const field of fields) {
			if (field.type !== 'text') continue;
			const values = new Set<string>();
			for (const doc of docs) {
				const value = doc[field.key];
				if (typeof value === 'string' && value.trim()) values.add(value.trim());
			}
			const source = SUGGESTIONS[`${entity}.${field.key}`];
			if (source?.type === 'cross' && source.collection && source.field) {
				for (const doc of allCollections[source.collection].docs) {
					const value = doc[source.field];
					if (typeof value === 'string' && value.trim()) values.add(value.trim());
				}
			}
			if (source?.type === 'nut') {
				for (const value of nutProducts) values.add(value);
			}
			const sorted = [...values].sort((a, b) => a.localeCompare(b)).slice(0, 50);
			if (sorted.length > 0) result[field.key] = sorted;
		}
		return result;
	}, [fields, entity, docs, allCollections, nutProducts]);

	const toggleAll = () => {
		setSelected(selectedAll ? [] : sortedDocs.map((doc) => doc.id));
	};

	const toggleOne = (id: string) => {
		setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
	};

	const emptyForm = () =>
		Object.fromEntries(fields.map((field) => [field.key, field.type === 'number' ? 0 : '']));

	const openCreate = () => {
		setEditingId(null);
		setForm(emptyForm());
		setModalOpen(true);
	};

	const openEdit = (doc: Doc) => {
		setEditingId(doc.id);
		setForm(Object.fromEntries(fields.map((field) => [field.key, doc[field.key] ?? ''])));
		setModalOpen(true);
	};

	const existingFieldValues = (field: FieldDef): (string | number)[] =>
		docs.map((doc) => String(doc[field.key] ?? ''));

	const handleGenerate = (field: FieldDef) => {
		let value = generateFieldValue(entity, field.key, form, existingFieldValues(field));
		for (
			let attempt = 0;
			attempt < 5 && docs.some((doc) => String(doc[field.key]) === value);
			attempt++
		) {
			value = generateFieldValue(entity, field.key, form, existingFieldValues(field));
		}
		setForm((prev) => ({ ...prev, [field.key]: value }));
	};

	const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (hasErrors) return;
		setSaving(true);
		try {
			const payload = { ...form };
			if (!editingId) {
				for (const field of fields) {
					if (field.auto && !payload[field.key]) {
						payload[field.key] = generateFieldValue(
							entity,
							field.key,
							payload,
							existingFieldValues(field),
						);
					}
				}
			}

			if (editingId) {
				await store.update(entity, editingId, payload);
				toast(S.saved, 'success');
			} else {
				await store.create(entity, payload);
				toast(S.created, 'success');
			}
			setModalOpen(false);
		} catch (err) {
			console.error(err);
			toast(S.errorOp, 'error');
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = async () => {
		if (!confirm) return;
		try {
			if (confirm.mode === 'batch') {
				await store.batchDelete(entity, selected);
				setSelected([]);
			} else if (confirm.docId) {
				await store.remove(entity, confirm.docId);
			}
			toast(S.deleted, 'success');
		} catch (err) {
			console.error(err);
			toast(S.errorOp, 'error');
		} finally {
			setConfirm(null);
		}
	};

	const handleAIFill = async () => {
		setAiFilling(true);
		try {
			const selectOptions = fields
				.filter((field) => field.type === 'select')
				.map((field) => `${field.key}: ${(field.options ?? []).join(' | ')}`)
				.join('\n');
			const raw = await ai.generate(
				`Generá un registro ficticio realista para almacén. Tabla: "${title}". Devolvé ÚNICAMENTE JSON con estas claves: ${fields.map((f) => f.key).join(', ')}.${selectOptions ? `\nValores posibles para los select:\n${selectOptions}` : ''}`,
			);
			const parsed = extractJson(raw);
			if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
				throw new Error('Respuesta del asistente inválida.');
			}
			const source = parsed as Record<string, unknown>;
			setForm(Object.fromEntries(fields.map((field) => [field.key, source[field.key] ?? ''])));
			toast(S.saved, 'success');
		} catch {
			toast(S.aiNotConfigured, 'info');
		} finally {
			setAiFilling(false);
		}
	};

	const handleMock = async () => {
		if (injecting) return;
		setInjecting(true);
		try {
			await onInjectMock(entity, 10);
			toast(S.mockGenerated(10), 'success');
		} catch (err) {
			console.error(err);
			toast(S.errorOp, 'error');
		} finally {
			setInjecting(false);
		}
	};

	const renderField = (field: FieldDef) => {
		const disabled = Boolean(field.readonly && editingId) || saving;
		const isNumber = field.type === 'number';
		const generable = Boolean(field.gen);
		const hasSuggestions = Boolean(suggestions[field.key]);
		const error = errors[field.key];

		return (
			<div key={field.key} className={field.colSpan ? 'sm:col-span-2' : ''}>
				<label
					htmlFor={`field-${field.key}`}
					className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-600 dark:text-slate-300"
				>
					{labelOf(field)}
					{field.required && <span className="ml-0.5 text-rose-500">*</span>}
				</label>
				{field.type === 'select' ? (
					<select
						id={`field-${field.key}`}
						value={String(form[field.key] ?? '')}
						onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}
						disabled={disabled}
						aria-invalid={Boolean(error)}
						className={`${INPUT_BASE} ${error ? 'border-rose-400 dark:border-rose-500' : 'border-gray-300 dark:border-slate-700'} disabled:bg-gray-100 dark:disabled:bg-slate-800`}
					>
						<option value="">{S.selectPlaceholder}</option>
						{field.options?.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				) : (
					<div className="flex gap-2">
						<input
							id={`field-${field.key}`}
							type={isNumber ? 'number' : 'text'}
							list={hasSuggestions ? `suggest-${entity}-${field.key}` : undefined}
							value={String(form[field.key] ?? '')}
							onChange={(event) =>
								setForm({
									...form,
									[field.key]: isNumber ? Number(event.target.value) : event.target.value,
								})
							}
							disabled={disabled}
							aria-invalid={Boolean(error)}
							className={`${INPUT_BASE} ${generable ? 'flex-1' : ''} ${error ? 'border-rose-400 dark:border-rose-500' : 'border-gray-300 dark:border-slate-700'} disabled:bg-gray-100 dark:disabled:bg-slate-800`}
						/>
						{generable && (
							<button
								type="button"
								onClick={() => handleGenerate(field)}
								disabled={saving}
								aria-label={S.generate}
								title={S.generate}
								className="flex w-10 shrink-0 items-center justify-center rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-600 transition hover:bg-indigo-100 disabled:opacity-50 dark:border-indigo-500/30 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-900"
							>
								<Dices size={16} />
							</button>
						)}
					</div>
				)}
				{hasSuggestions && (
					<datalist id={`suggest-${entity}-${field.key}`}>
						{suggestions[field.key].map((option) => (
							<option key={option} value={option} />
						))}
					</datalist>
				)}
				{error && <p className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">{error}</p>}
			</div>
		);
	};

	return (
		<div className="flex h-full animate-fade-in flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
			{selected.length > 0 && (
				<div className="z-20 flex items-center justify-between bg-indigo-600 px-4 py-3 text-white shadow-md animate-fade-in-down">
					<span className="flex items-center gap-2 text-sm font-semibold">
						<span className="rounded bg-white px-2 py-0.5 text-xs font-bold text-indigo-600">
							{selected.length}
						</span>
						{S.selectedRecords}
					</span>
					<div className="flex gap-2">
						<button
							type="button"
							onClick={() => setSelected([])}
							className="rounded-lg bg-indigo-700 px-3 py-1.5 text-sm transition hover:bg-indigo-800"
						>
							{S.cancel}
						</button>
						<button
							type="button"
							onClick={() => setConfirm({ mode: 'batch' })}
							className="flex items-center gap-1.5 rounded-lg bg-rose-500 px-3 py-1.5 text-sm transition hover:bg-rose-600"
						>
							<Trash2 size={15} />
							{S.delete}
						</button>
					</div>
				</div>
			)}

			<div className="flex flex-col gap-4 border-b border-gray-200 bg-gray-50/50 p-4 md:flex-row md:items-center md:justify-between md:p-6 dark:border-slate-800 dark:bg-slate-800/30">
				<div>
					<h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
					<p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
						{activeCount > 0 ? (
							<>
								<span className="font-bold text-indigo-600 dark:text-indigo-300">
									{sortedDocs.length}
								</span>{' '}
								/ {docs.length} {S.records}
							</>
						) : (
							<>
								{docs.length} {S.records}
							</>
						)}
					</p>
				</div>
				<div className="flex flex-wrap items-center gap-3">
					<button
						type="button"
						onClick={handleMock}
						disabled={!canInjectMock || injecting}
						className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
					>
						{injecting ? (
							<Loader2 size={15} className="animate-spin text-indigo-500" />
						) : (
							<Sparkles size={15} className="text-indigo-500" />
						)}
						{S.generateMock}
					</button>
					{canEdit && (
						<button
							type="button"
							onClick={openCreate}
							className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
						>
							<Plus size={15} />
							{S.add}
						</button>
					)}
				</div>
			</div>

			<DataFilters
				fields={fields}
				filters={filters}
				activeCount={activeCount}
				onQuery={setQuery}
				onSelect={setSelect}
				onNumber={setNumber}
				onClear={clear}
			/>

			<div className="relative flex-1 overflow-x-auto">
				{loading && (
					<div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm dark:bg-slate-900/60">
						<Loader2 size={28} className="animate-spin text-indigo-600" />
					</div>
				)}
				{error && (
					<div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 p-8 text-center text-sm text-rose-600 dark:bg-slate-900/60">
						{error}
					</div>
				)}
				{!loading && !error && docs.length === 0 && (
					<p className="p-10 text-center text-sm text-gray-500 dark:text-slate-400">{S.emptyState}</p>
				)}
				{!loading && !error && docs.length > 0 && sortedDocs.length === 0 && (
					<p className="p-10 text-center text-sm text-gray-500 dark:text-slate-400">
						{S.noResults}
					</p>
				)}

			{!loading && !error && sortedDocs.length > 0 && isMobile && (
				<div className="space-y-3 p-4">
					{sortedDocs.map((doc) => (
						<div
							key={doc.id}
							className={`card card-sm border bg-white shadow-sm dark:bg-slate-900 ${
								selected.includes(doc.id)
									? 'border-indigo-400 dark:border-indigo-500'
									: 'border-gray-200 dark:border-slate-800'
							}`}
						>
							<div className="card-body gap-2 p-4">
								<div className="flex items-center justify-between gap-2">
									<div className="flex min-w-0 items-center gap-2">
										{canDelete && (
											<button
												type="button"
												onClick={() => toggleOne(doc.id)}
												aria-label={S.selectedRecords}
												className="shrink-0 text-gray-400 transition hover:text-indigo-600"
											>
												{selected.includes(doc.id) ? (
													<CheckSquare size={18} className="text-indigo-600" />
												) : (
													<Square size={18} />
												)}
											</button>
										)}
										<span className="truncate font-bold text-gray-900 dark:text-white">
											{String(doc[fields[0].key] ?? '')}
										</span>
									</div>
									<div className="flex shrink-0 items-center">
										{canEdit && (
											<button
												type="button"
												onClick={() => openEdit(doc)}
												aria-label={S.edit}
												className="rounded p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-indigo-600 dark:hover:bg-slate-800"
											>
												<Edit size={16} />
											</button>
										)}
										{canDelete && (
											<button
												type="button"
												onClick={() => setConfirm({ mode: 'single', docId: doc.id })}
												aria-label={S.delete}
												className="rounded p-1.5 text-gray-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
											>
												<Trash2 size={16} />
											</button>
										)}
									</div>
								</div>
								{fields.length > 1 && (
									<div className="mt-1 space-y-1.5 border-t border-gray-100 pt-2 dark:border-slate-800">
										{fields.slice(1).map((field) => {
											const value = doc[field.key];
											return (
												<div
													key={field.key}
													className="flex items-center justify-between gap-3 text-sm"
												>
													<span className="text-gray-500 dark:text-slate-400">
														{labelOf(field)}
													</span>
													<span className="max-w-[60%] truncate text-right font-medium text-gray-900 dark:text-gray-100">
														{BADGE_FIELDS.has(field.key) && typeof value === 'string' ? (
															<StatusBadge status={value} />
														) : (
															String(value ?? '')
														)}
													</span>
												</div>
											);
										})}
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			)}

			{!loading && !error && sortedDocs.length > 0 && !isMobile && (
				<table className="w-full border-collapse text-left">
						<thead>
							<tr className="border-b border-gray-200 bg-gray-50/80 dark:border-slate-800 dark:bg-slate-800/50">
								{canDelete && (
									<th className="w-12 px-4 py-3 text-center">
										<button
											type="button"
											onClick={toggleAll}
											aria-label={S.selectedRecords}
											className="text-gray-400 transition hover:text-indigo-600"
										>
											{selectedAll ? (
												<CheckSquare size={18} className="text-indigo-600" />
											) : (
												<Square size={18} />
											)}
										</button>
									</th>
								)}
							{fields.map((field) => (
								<th
									key={field.key}
									className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400"
								>
									<button
										type="button"
										onClick={() => toggleSort(field.key)}
										title={`${labelOf(field)}`}
										className="inline-flex items-center gap-1 uppercase tracking-wider transition hover:text-indigo-600 dark:hover:text-indigo-300"
									>
										{labelOf(field)}
										{sortKey === field.key &&
											(direction === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
									</button>
								</th>
							))}
							{(canEdit || canDelete) && (
								<th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
									{S.actions}
								</th>
							)}
							</tr>
						</thead>
					<tbody>
							{sortedDocs.map((doc) => (
								<tr
									key={doc.id}
									className={`border-b border-gray-100 transition hover:bg-indigo-50/30 dark:border-slate-800 dark:hover:bg-indigo-950/30 ${
										selected.includes(doc.id) ? 'bg-indigo-50/50 dark:bg-indigo-950/40' : ''
									}`}
								>
									{canDelete && (
										<td className="px-4 py-3 text-center">
											<button
												type="button"
												onClick={() => toggleOne(doc.id)}
												aria-label={S.selectedRecords}
												className="text-gray-400 transition hover:text-indigo-600"
											>
												{selected.includes(doc.id) ? (
													<CheckSquare size={18} className="text-indigo-600" />
												) : (
													<Square size={18} />
												)}
											</button>
										</td>
									)}
									{fields.map((field) => {
										const value = doc[field.key];
										return (
											<td
												key={field.key}
												className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-slate-200"
											>
												{BADGE_FIELDS.has(field.key) && typeof value === 'string' ? (
													<StatusBadge status={value} />
												) : (
													String(value ?? '')
												)}
											</td>
										);
									})}
									{(canEdit || canDelete) && (
										<td className="whitespace-nowrap px-4 py-3 text-right">
											{canEdit && (
												<button
													type="button"
													onClick={() => openEdit(doc)}
													aria-label={S.edit}
													className="mr-2 rounded p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-indigo-600 dark:hover:bg-slate-800"
												>
													<Edit size={16} />
												</button>
											)}
											{canDelete && (
												<button
													type="button"
													onClick={() => setConfirm({ mode: 'single', docId: doc.id })}
													aria-label={S.delete}
													className="rounded p-1.5 text-gray-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
												>
													<Trash2 size={16} />
												</button>
											)}
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>

			{modalOpen && (
				<Modal
					title={`${editingId ? S.edit : S.add} · ${title}`}
					onClose={() => setModalOpen(false)}
					onSubmit={handleSubmit}
					footer={
						<>
							<button
								type="button"
								onClick={() => setModalOpen(false)}
								className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
							>
								{S.cancel}
							</button>
							<button
								type="submit"
								disabled={saving || hasErrors}
								className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
							>
								{saving && <Loader2 size={15} className="animate-spin" />}
								{S.save}
							</button>
						</>
					}
				>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{!editingId && ai.isConfigured() && (
							<div className="flex justify-end sm:col-span-2">
								<button
									type="button"
									onClick={handleAIFill}
									disabled={aiFilling}
									className="flex items-center gap-1.5 rounded-lg bg-indigo-100 px-3 py-1.5 text-xs font-bold text-indigo-700 transition hover:bg-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-900"
								>
									{aiFilling ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
									{S.aiFillForm}
								</button>
							</div>
						)}
						{fields.map(renderField)}
					</div>
				</Modal>
			)}

			{confirm && (
				<Modal
					title={S.deleteConfirmTitle}
					onClose={() => setConfirm(null)}
					footer={
						<>
							<button
								type="button"
								onClick={() => setConfirm(null)}
								className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
							>
								{S.cancel}
							</button>
							<button
								type="button"
								onClick={handleDelete}
								className="rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
							>
								{S.delete}
							</button>
						</>
					}
				>
					<p className="text-sm text-gray-600 dark:text-slate-300">
						{confirm.mode === 'batch' ? S.deleteBatchConfirmBody : S.deleteConfirmBody}
					</p>
				</Modal>
			)}
		</div>
	);
}
