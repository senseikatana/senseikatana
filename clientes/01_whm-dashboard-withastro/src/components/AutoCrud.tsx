import { useState, useMemo, type ReactNode } from 'react';
import { useInventoryStore, useOrdersStore, useCustomersStore } from '../lib/stores';
import { useAIGenerateOrders, useAIGenerateCustomers, useAIGenerateInventory } from '../lib/hooks';
import { InventoryItemFormSchema, OrderFormSchema, CustomerFormSchema } from '../lib/schemas';
import QueryProvider from './QueryProvider';
import type { z } from 'zod';

export interface CrudColumn {
  key: string;
  label: string;
  html?: boolean;
  sortable?: boolean;
}

export interface CrudField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface CrudConfig {
  title: string;
  description?: string;
  columns: CrudColumn[];
  fields: CrudField[];
  searchKeys: string[];
  idKey: string;
  displayKey: string;
}

type StoreType = 'inventory' | 'orders' | 'customers';

const SCHEMAS: Record<StoreType, z.ZodType<any>> = {
  inventory: InventoryItemFormSchema,
  orders: OrderFormSchema,
  customers: CustomerFormSchema,
};

function getStore(type: StoreType) {
  switch (type) {
    case 'inventory': return useInventoryStore;
    case 'orders': return useOrdersStore;
    case 'customers': return useCustomersStore;
  }
}

function getAiGen(type: StoreType) {
  switch (type) {
    case 'inventory': return useAIGenerateInventory;
    case 'orders': return useAIGenerateOrders;
    case 'customers': return useAIGenerateCustomers;
  }
}

function FormModal({
  open, onClose, onSubmit, fields, schema, initial, title,
}: {
  open: boolean; onClose: () => void; onSubmit: (d: Record<string, string>) => void;
  fields: CrudField[]; schema: z.ZodType<any>; initial?: Record<string, string>; title: string;
}) {
  const [form, setForm] = useState<Record<string, string>>(() => {
    if (initial) return { ...initial };
    const init: Record<string, string> = {};
    for (const f of fields) init[f.name] = '';
    return init;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!open) return null;

  const handleChange = (name: string, value: string) => {
    setForm(p => ({ ...p, [name]: value }));
    setErrors(p => ({ ...p, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const fn = issue.path[0] as string;
        if (!fe[fn]) fe[fn] = issue.message;
      }
      setErrors(fe);
      return;
    }
    onSubmit(parsed.data as Record<string, string>);
    const init: Record<string, string> = {};
    for (const f of fields) init[f.name] = '';
    setForm(init);
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button type="button" onClick={onClose} className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-300">
            <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(field => (
            <label key={field.name} className="block">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{field.label}</span>
              {field.type === 'select' && field.options ? (
                <select value={form[field.name] ?? ''} onChange={e => handleChange(field.name, e.target.value)}
                  className="mt-0.5 block w-full rounded-lg border border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white">
                  <option value="">Seleccionar...</option>
                  {field.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : (
                <input type={field.type} value={form[field.name] ?? ''} onChange={e => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="mt-0.5 block w-full rounded-lg border border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500" />
              )}
              {errors[field.name] && <p className="mt-1 text-xs text-red-500">{errors[field.name]}</p>}
            </label>
          ))}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">Cancelar</button>
            <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ConfirmDialog({ open, onClose, onConfirm, message }: {
  open: boolean; onClose: () => void; onConfirm: () => void; message: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Confirmar</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">Cancelar</button>
          <button type="button" onClick={onConfirm} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default function AutoCrud({ type, config: rawConfig }: { type: StoreType; config: CrudConfig | string }) {
  return <QueryProvider><AutoCrudInner type={type} config={rawConfig} /></QueryProvider>;
}

function AutoCrudInner({ type, config: rawConfig }: { type: StoreType; config: CrudConfig | string }) {
  const config = typeof rawConfig === 'string' ? JSON.parse(rawConfig) : rawConfig;
  const store = getStore(type)();
  const aiGen = getAiGen(type)();
  const schema = SCHEMAS[type];
  const { title, description, columns, fields, searchKeys, idKey, displayKey } = config;

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [deleting, setDeleting] = useState<any>(null);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    let result = [...store.items];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((item: any) =>
        searchKeys.some((key: string) => String(item[key] ?? '').toLowerCase().includes(q))
      );
    }
    if (sortKey) {
      result.sort((a: any, b: any) => {
        const cmp = String(a[sortKey] ?? '').localeCompare(String(b[sortKey] ?? ''), 'es');
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return result;
  }, [store.items, search, sortKey, sortDir]);

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const openAdd = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (item: any) => { setEditing(item); setModalOpen(true); };

  const handleSubmit = (formData: Record<string, string>) => {
    if (editing) store.updateItem(editing[idKey], formData as any);
    else store.addItem(formData as any);
    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = () => {
    if (deleting) { store.deleteItem(deleting[idKey]); setDeleting(null); }
  };

  const renderCell = (item: any, col: CrudColumn): ReactNode => {
    const val = item[col.key];
    if (col.html) {
      const n = Number(val);
      if (!isNaN(n)) {
        let cls = 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
        if (n < 100) cls = 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
        else if (n < 500) cls = 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
        return <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${cls}`}>{n}</span>;
      }
      return <span dangerouslySetInnerHTML={{ __html: val ?? '' }} />;
    }
    return String(val ?? '');
  };

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h2>
          {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => aiGen.mutate(3)} disabled={aiGen.isPending}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60">
            {aiGen.isPending ? 'Generando...' : 'Generar con IA'}
          </button>
          <button type="button" onClick={openAdd}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800 dark:bg-indigo-600 dark:hover:bg-indigo-500">
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            Añadir
          </button>
        </div>
      </div>

      {store.items.length > 0 && (
        <div className="relative mt-3 max-w-xs">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..."
            className="mt-0.5 block w-full rounded-lg border border-gray-300 py-1.5 pl-9 pr-3 text-xs shadow-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500" />
          <span className="pointer-events-none absolute inset-y-0 left-0 grid w-8 place-content-center text-gray-500">
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
          </span>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="mt-4 rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {store.items.length === 0 ? 'No hay datos todavía. Añade tu primer registro.' : 'No se encontraron resultados.'}
          </p>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-800">
            <thead className="ltr:text-left rtl:text-right">
              <tr className="*:font-medium *:text-gray-900 dark:*:text-gray-300">
                {columns.map((col: CrudColumn) => (
                  <th key={col.key} className={`px-3 py-2 whitespace-nowrap text-xs ${col.sortable ? 'cursor-pointer select-none hover:text-indigo-600 dark:hover:text-indigo-400' : ''}`}
                    onClick={() => col.sortable && handleSort(col.key)}>
                    <span className="inline-flex items-center gap-1">{col.label}{sortKey === col.key && (
                      <svg className="size-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d={sortDir === 'asc' ? 'M4.5 15.75l7.5-7.5 7.5 7.5' : 'M19.5 8.25l-7.5 7.5-7.5-7.5'} />
                      </svg>
                    )}</span>
                  </th>
                ))}
                <th className="px-3 py-2 whitespace-nowrap text-right text-xs font-medium text-gray-900 dark:text-gray-300">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filtered.map((item: any) => (
                <tr key={item[idKey]} className="*:px-3 *:py-2.5 *:text-sm *:text-gray-700 dark:*:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  {columns.map((col: CrudColumn) => (
                    <td key={col.key} className="whitespace-nowrap">{renderCell(item, col)}</td>
                  ))}
                  <td>
                    <div className="flex justify-end gap-1">
                      <button type="button" onClick={() => openEdit(item)} className="rounded-md p-1 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400" title="Editar">
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                      </button>
                      <button type="button" onClick={() => setDeleting(item)} className="rounded-md p-1 text-gray-400 hover:text-red-500" title="Eliminar">
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {filtered.length} registro{filtered.length !== 1 ? 's' : ''}{search && ` (filtrados de ${store.items.length})`}
          </p>
        </div>
      )}

      <FormModal key={editing?.id ?? 'new'} open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }}
        onSubmit={handleSubmit} fields={fields} schema={schema}
        initial={editing ? Object.fromEntries(fields.map((f: CrudField) => [f.name, String((editing as any)[f.name] ?? '')])) : undefined}
        title={editing ? `Editar ${title.slice(0, -1)}` : `Añadir ${title.slice(0, -1)}`} />
      <ConfirmDialog open={deleting !== null} onClose={() => setDeleting(null)} onConfirm={handleDelete}
        message={deleting ? `¿Eliminar "${String((deleting as any)[displayKey] ?? '')}"?` : ''} />
    </div>
  );
}
