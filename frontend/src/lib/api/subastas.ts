import type { Subasta } from '../types';
import { apiFetch } from './client';

export function fetchSubastas(): Promise<Subasta[]> {
	return apiFetch<Subasta[]>('/api/subastas/');
}
