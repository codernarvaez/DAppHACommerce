import type { Lote, LoteCreateInput, LoteUpdateInput } from '../types';
import { apiFetch } from './client';

interface ApiMessage {
	message: string;
}

export function fetchLotes(): Promise<Lote[]> {
	return apiFetch<Lote[]>('/api/lotes/');
}

export function fetchLote(id: string): Promise<Lote> {
	return apiFetch<Lote>(`/api/lotes/${id}`);
}

export function createLote(payload: LoteCreateInput): Promise<Lote> {
	return apiFetch<Lote>('/api/lotes/', {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export function updateLote(id: string, payload: LoteUpdateInput): Promise<Lote> {
	return apiFetch<Lote>(`/api/lotes/${id}`, {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export function deleteLote(id: string): Promise<ApiMessage> {
	return apiFetch<ApiMessage>(`/api/lotes/${id}`, {
		method: 'DELETE',
	});
}