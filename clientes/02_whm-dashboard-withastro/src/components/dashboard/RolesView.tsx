import { useState } from 'react';
import { Pencil, Plus, RotateCcw, ShieldCheck, Trash2 } from 'lucide-react';
import {
	CAPABILITY_GROUPS,
	SPECIAL_CAPS,
	type Capability,
	type RoleDef,
} from '../../auth/roles';
import { resetRoles, saveRoles } from '../../data/rolesStore';
import { useI18n } from '../../i18n/LocaleProvider';
import type { StringsDict } from '../../i18n/dictionaries';
import type { Doc } from '../../types';
import { Modal } from './Modal';
import { useToast } from './Toast';

interface RolesViewProps {
	roles: RoleDef[];
	users: Doc[];
}

interface Draft {
	id: string;
	label: string;
	description: string;
	capabilities: Capability[];
}

function slugify(value: string): string {
	return value
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

const CHECKBOX =
	'h-4 w-4 shrink-0 accent-indigo-600';

export function RolesView({ roles, users }: RolesViewProps) {
	const { S } = useI18n();
	const toast = useToast();
	const [draft, setDraft] = useState<Draft | null>(null);
	const [deleting, setDeleting] = useState<RoleDef | null>(null);
	const [resetOpen, setResetOpen] = useState(false);

	const usedBy = (roleId: string): number => users.filter((user) => user.role === roleId).length;

	const openNew = () => {
		setDraft({ id: '', label: '', description: '', capabilities: [] });
	};

	const openEdit = (role: RoleDef) => {
		setDraft({
			id: role.id,
			label: role.label,
			description: role.description ?? '',
			capabilities: [...role.capabilities],
		});
	};

	const toggleCap = (cap: Capability) => {
		if (!draft) return;
		setDraft({
			...draft,
			capabilities: draft.capabilities.includes(cap)
				? draft.capabilities.filter((item) => item !== cap)
				: [...draft.capabilities, cap],
		});
	};

	const handleSave = async () => {
		if (!draft || !draft.label.trim()) return;
		let id = draft.id;
		if (!id) {
			const base = slugify(draft.label) || 'rol';
			id = base;
			let n = 2;
			while (roles.some((role) => role.id === id)) id = `${base}-${n++}`;
		}
		const next = [
			...roles.filter((role) => role.id !== draft.id),
			{ id, label: draft.label.trim(), description: draft.description.trim() || undefined, capabilities: draft.capabilities },
		];
		await saveRoles(next);
		setDraft(null);
		toast(S.saved, 'success');
	};

	const handleDelete = async () => {
		if (!deleting) return;
		if (usedBy(deleting.id) > 0) {
			toast(S.roleInUse, 'error');
			setDeleting(null);
			return;
		}
		await saveRoles(roles.filter((role) => role.id !== deleting.id));
		toast(S.deleted, 'success');
		setDeleting(null);
	};

	const handleReset = async () => {
		await resetRoles();
		setResetOpen(false);
		toast(S.saved, 'success');
	};

	return (
		<div className="mx-auto max-w-5xl space-y-4 animate-fade-in">
			<div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between md:p-6 dark:border-slate-800 dark:bg-slate-900">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
						<ShieldCheck size={20} />
					</div>
					<div>
						<h2 className="text-xl font-bold text-gray-900 dark:text-white">{S.rolesTitle}</h2>
						<p className="mt-0.5 text-xs text-gray-500 dark:text-slate-400">{S.rolesSubtitle}</p>
					</div>
				</div>
				<div className="flex flex-wrap items-center gap-3">
					<button
						type="button"
						onClick={() => setResetOpen(true)}
						className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
					>
						<RotateCcw size={15} className="text-gray-400" />
						{S.resetRoles}
					</button>
					<button
						type="button"
						onClick={openNew}
						className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
					>
						<Plus size={15} />
						{S.newRole}
					</button>
				</div>
			</div>

			{roles.length === 0 && (
				<p className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
					{S.rolesEmpty}
				</p>
			)}

			<div className="space-y-3">
				{roles.map((role) => {
					const used = usedBy(role.id);
					return (
						<div
							key={role.id}
							className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
						>
							<div className="min-w-0">
								<div className="flex items-center gap-2">
									<span className="text-sm font-bold text-gray-900 dark:text-white">
										{role.label}
									</span>
									<span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-gray-500 dark:bg-slate-800 dark:text-slate-400">
										{role.id}
									</span>
									<span className="text-[11px] text-gray-400 dark:text-slate-500">
										{role.capabilities.length} · {used} {S.roleUsers}
									</span>
								</div>
								{role.description && (
									<p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
										{role.description}
									</p>
								)}
							</div>
							<div className="flex shrink-0 items-center gap-1">
								<button
									type="button"
									onClick={() => openEdit(role)}
									aria-label={S.edit}
									title={S.edit}
									className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-indigo-600 dark:hover:bg-slate-800"
								>
									<Pencil size={16} />
								</button>
								<button
									type="button"
									onClick={() => setDeleting(role)}
									aria-label={S.deleteRole}
									title={S.deleteRole}
									className="rounded-lg p-2 text-gray-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
								>
									<Trash2 size={16} />
								</button>
							</div>
						</div>
					);
				})}
			</div>

			{draft && (
				<Modal
					title={`${draft.id ? S.edit : S.add} · ${S.rolesTitle}`}
					onClose={() => setDraft(null)}
					onSubmit={handleSave}
					footer={
						<>
							<button
								type="button"
								onClick={() => setDraft(null)}
								className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
							>
								{S.cancel}
							</button>
							<button
								type="submit"
								disabled={!draft.label.trim()}
								className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
							>
								{S.save}
							</button>
						</>
					}
				>
					<div className="space-y-4">
						<label className="block">
							<span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-600 dark:text-slate-300">
								{S.roleName} *
							</span>
							<input
								type="text"
								value={draft.label}
								onChange={(event) => setDraft({ ...draft, label: event.target.value })}
								className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:focus:ring-indigo-900/40"
							/>
						</label>
						<label className="block">
							<span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-600 dark:text-slate-300">
								{S.roleDescription}
							</span>
							<textarea
								value={draft.description}
								onChange={(event) => setDraft({ ...draft, description: event.target.value })}
								rows={2}
								className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:focus:ring-indigo-900/40"
							/>
						</label>

						<div>
							<p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-600 dark:text-slate-300">
								{S.capabilities}
							</p>
							<div className="space-y-1.5">
								{CAPABILITY_GROUPS.map((group) => (
									<div
										key={group.moduleKey}
										className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 dark:border-slate-700"
									>
										<span className="text-sm font-medium text-gray-800 dark:text-gray-100">
											{S[group.moduleKey as keyof StringsDict] as string}
										</span>
										<div className="flex items-center gap-4">
											<label className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-slate-300">
												<input
													type="checkbox"
													checked={draft.capabilities.includes(group.viewCap)}
													onChange={() => toggleCap(group.viewCap)}
													className={CHECKBOX}
												/>
												{S.view}
											</label>
											{group.editCap && (
												<label className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-slate-300">
													<input
														type="checkbox"
														checked={draft.capabilities.includes(group.editCap)}
														onChange={() => toggleCap(group.editCap!)}
														className={CHECKBOX}
													/>
													{S[group.editLabelKey ?? ('edit' as const)]}
												</label>
											)}
										</div>
									</div>
								))}
							</div>
							<div className="mt-3 flex flex-wrap gap-2">
								{SPECIAL_CAPS.map((special) => (
									<label
										key={special.cap}
										className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-700 transition has-checked:border-indigo-600 has-checked:bg-indigo-50 has-checked:text-indigo-700 dark:border-slate-700 dark:text-slate-300 dark:has-checked:border-indigo-500 dark:has-checked:bg-indigo-950/50 dark:has-checked:text-indigo-300"
									>
										<input
											type="checkbox"
											checked={draft.capabilities.includes(special.cap)}
											onChange={() => toggleCap(special.cap)}
											className={CHECKBOX}
										/>
										{S[special.labelKey as keyof StringsDict] as string}
									</label>
								))}
							</div>
						</div>
					</div>
				</Modal>
			)}

			{deleting && (
				<Modal
					title={S.deleteRole}
					onClose={() => setDeleting(null)}
					footer={
						<>
							<button
								type="button"
								onClick={() => setDeleting(null)}
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
						{S.deleteConfirmBody}
					</p>
				</Modal>
			)}

			{resetOpen && (
				<Modal
					title={S.resetRoles}
					onClose={() => setResetOpen(false)}
					footer={
						<>
							<button
								type="button"
								onClick={() => setResetOpen(false)}
								className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
							>
								{S.cancel}
							</button>
							<button
								type="button"
								onClick={handleReset}
								className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
							>
								{S.save}
							</button>
						</>
					}
				>
					<p className="text-sm text-gray-600 dark:text-slate-300">
						{S.deleteConfirmBody}
					</p>
				</Modal>
			)}
		</div>
	);
}
