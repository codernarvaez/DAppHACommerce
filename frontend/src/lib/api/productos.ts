import type { Producto, ProductoCreateInput, ProductoUpdateInput } from '../types';
import { apiFetch } from './client';

interface ApiMessage {
	message: string;
}

export function fetchProductos(): Promise<Producto[]> {
	return apiFetch<Producto[]>('/api/productos/');
}

export function fetchProducto(id: string): Promise<Producto> {
	return apiFetch<Producto>(`/api/productos/${id}`);
}

export function createProducto(payload: ProductoCreateInput): Promise<Producto> {
	return apiFetch<Producto>('/api/productos/', {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export function updateProducto(id: string, payload: ProductoUpdateInput): Promise<Producto> {
	return apiFetch<Producto>(`/api/productos/${id}`, {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export function deleteProducto(id: string): Promise<ApiMessage> {
	return apiFetch<ApiMessage>(`/api/productos/${id}`, {
		method: 'DELETE',
	});
}
