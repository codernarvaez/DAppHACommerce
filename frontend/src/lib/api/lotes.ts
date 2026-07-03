import type { Lote } from '../types';
import { apiFetch } from './client';

export function fetchLotes(): Promise<Lote[]> {
	return apiFetch<Lote[]>('/api/lotes/');
}

export function fetchLote(id: string): Promise<Lote> {
	return apiFetch<Lote>(`/api/lotes/${id}`);
}