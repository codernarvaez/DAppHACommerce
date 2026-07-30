const GEOGUARD_BASE = 'https://geoguard-exped.onrender.com';

export interface BodegaItem {
	id: string;
	ordenCompraId: string;
	pesoIngresoKg: number;
	pesoSalidaKg: number;
	estado: string;
}

export interface CompraItem {
	id: string;
	muestraId: string;
	precioAcordado: number;
	volumenKg: number;
	primas: number;
	aprobadoEUDR: boolean;
	estado: string;
}

async function geoFetch<T>(path: string, tokenOverride?: string): Promise<T> {
	const url = `${GEOGUARD_BASE}${path}`;

	const token = tokenOverride || process.env.GEOGUARD_TOKEN || import.meta.env.GEOGUARD_TOKEN || '';
	const headers: Record<string, string> = { Accept: 'application/json' };
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	const response = await fetch(url, {
		headers,
		signal: AbortSignal.timeout(30_000),
	});

	if (!response.ok) {
		throw new Error(`GeoGuard API error: ${response.status} ${response.statusText}`);
	}

	return (await response.json()) as T;
}

export function fetchBodega(token?: string): Promise<BodegaItem[]> {
	return geoFetch<BodegaItem[]>('/acopio/bodega/', token);
}

export function fetchCompras(token?: string): Promise<CompraItem[]> {
	return geoFetch<CompraItem[]>('/acopio/compras/', token);
}

export function fetchCompraPorMuestra(muestraId: string, token?: string): Promise<CompraItem> {
	return geoFetch<CompraItem>(`/acopio/compras/muestra/${muestraId}`, token);
}
