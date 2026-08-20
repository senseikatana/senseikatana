import type { StatusTone } from '../types';

const GREEN = new Set([
	'OK',
	'Activo',
	'Completado',
	'Disponible',
	'Activa',
	'Completada',
	'Cliente Activo',
]);

const ORANGE = new Set([
	'Bajo',
	'Pendiente',
	'Descargando',
	'En Ruta',
	'Empacando',
	'Cross-Docking',
	'En Negociación',
	'Nuevo Lead',
]);

const RED = new Set(['Crítico', 'Inactivo', 'Mantenimiento', 'Cancelado', 'Pausada']);

export function getStatusTone(status: string): StatusTone {
	if (GREEN.has(status)) return 'green';
	if (ORANGE.has(status)) return 'orange';
	if (RED.has(status)) return 'red';
	return 'gray';
}
