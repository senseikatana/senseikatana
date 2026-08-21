// @ts-nocheck
'use client';

import { useState } from 'react';

interface Column<T> {
  key: string;
  label: string;
  format?: (item: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  hideOnMobile?: boolean;
}

interface CrudTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onDeleteBatch?: (items: T[]) => void;
  onAdd?: () => void;
  addLabel?: string;
  emptyMessage?: string;
  totalRow?: React.ReactNode;
  title?: string;
  subtitle?: string;
  titleIcon?: string;
  accentColor?: string;
}

export function CrudTable<T extends { id: any }>({
  data,
  columns,
  onEdit,
  onDelete,
  onDeleteBatch,
  onAdd,
  addLabel = '+ Nuevo',
  emptyMessage = 'Sin registros',
  totalRow,
  title,
  subtitle,
  titleIcon,
  accentColor = 'var(--color-primary)',
}: CrudTableProps<T>) {
  const [selected, setSelected] = useState<Set<any>>(new Set());
  const [confirmBatch, setConfirmBatch] = useState(false);

  const toggleSelect = (id: any) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === data.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(data.map(item => item.id)));
    }
  };

  const handleBatchDelete = () => {
    if (!confirmBatch) {
      setConfirmBatch(true);
      setTimeout(() => setConfirmBatch(false), 3000);
      return;
    }
    const itemsToDelete = data.filter(item => selected.has(item.id));
    onDeleteBatch?.(itemsToDelete);
    setSelected(new Set());
    setConfirmBatch(false);
  };

  const isSelected = (id: any) => selected.has(id);

  return (
    <div className="card">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
        <div>
          {title && <h2 className="text-xl font-bold" style={{color: accentColor}}>{titleIcon} {title}</h2>}
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <button
              onClick={handleBatchDelete}
              className={`px-3 py-2 rounded-lg font-medium text-white text-sm ${confirmBatch ? 'bg-red' : 'bg-orange'}`}
              style={confirmBatch ? {background: 'var(--color-red)'} : {background: 'var(--color-orange)'}}
            >
              {confirmBatch ? 'Confirmar borrar ' + selected.size : 'Borrar ' + selected.size + ' seleccionados'}
            </button>
          )}
          {onAdd && (
            <button onClick={onAdd} className="px-4 py-2 rounded-lg font-medium text-white text-sm" style={{background: accentColor}}>
              {addLabel}
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              {onDeleteBatch && (
                <th className="w-10">
                  <input
                    type="checkbox"
                    checked={selected.size === data.length && data.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 cursor-pointer"
                  />
                </th>
              )}
              {columns.map(col => (
                <th key={col.key} className={`${col.headerClassName || ''} ${col.hideOnMobile ? 'hidden md:table-cell' : ''}`}>
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && <th className="text-center w-32">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className={isSelected(item.id) ? 'bg-blue-50' : ''}>
                {onDeleteBatch && (
                  <td>
                    <input
                      type="checkbox"
                      checked={isSelected(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </td>
                )}
                {columns.map(col => (
                  <td key={col.key} className={`${col.className || ''} ${col.hideOnMobile ? 'hidden md:table-cell' : ''}`}>
                    {(item as any)[col.key] === '' || (item as any)[col.key] == null ? '—' : col.format ? col.format(item) : (item as any)[col.key]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="text-center">
                    <div className="inline-flex gap-1">
                      {onEdit && <button onClick={() => onEdit(item)} className="btn btn-sm">✏️</button>}
                      {onDelete && <button onClick={() => onDelete(item)} className="btn btn-sm text-red">✕</button>}
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length + (onDeleteBatch ? 1 : 0) + ((onEdit || onDelete) ? 1 : 0)} className="text-center py-8 text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
          {totalRow && <tfoot>{totalRow}</tfoot>}
        </table>
      </div>
    </div>
  );
}

