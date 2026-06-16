import type { Producto } from '../types';
import { apiFetch } from './client';

export function fetchProductos(): Promise<Producto[]> {
	return apiFetch<Producto[]>('/api/productos/');
}

export function fetchProducto(id: string): Promise<Producto> {
	return apiFetch<Producto>(`/api/productos/${id}`);
}
