const GEOGUARD_BASE = 'https://geoguard-exped1.onrender.com';

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

function friendlyHttpError(status: number): string {
	switch (status) {
		case 401:
			return 'No autorizado. El servicio de trazabilidad requiere autenticación.';
		case 403:
			return 'Acceso denegado al servicio de trazabilidad.';
		case 404:
			return 'El servicio de trazabilidad no está disponible temporalmente.';
		case 429:
			return 'Demasiadas solicitudes. Intenta nuevamente en unos minutos.';
		case 500:
		case 502:
		case 503:
			return 'El servicio de trazabilidad está experimentando problemas. Intenta más tarde.';
		default:
			return `Error de conexión con el servicio de trazabilidad (código ${status}).`;
	}
}

async function geoFetch<T>(path: string, tokenOverride?: string): Promise<T> {
	const url = `${GEOGUARD_BASE}${path}`;

	const token = tokenOverride || process.env.GEOGUARD_TOKEN || import.meta.env.GEOGUARD_TOKEN || '';
	const headers: Record<string, string> = { Accept: 'application/json' };
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	let response: Response;
	try {
		response = await fetch(url, {
			headers,
			signal: AbortSignal.timeout(30_000),
		});
	} catch (err) {
		if (err instanceof DOMException && err.name === 'TimeoutError') {
			throw new Error('El servicio de trazabilidad no respondió a tiempo. Intenta nuevamente.');
		}
		throw new Error('No se pudo conectar con el servicio de trazabilidad. Verifica tu conexión a internet.');
	}

	if (!response.ok) {
		throw new Error(friendlyHttpError(response.status));
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

export interface CatalogoItem {
	id: string;
	codigoLote: string;
	pesoDisponibleKg: number;
	pesoTotalKg: number;
	tipoCafe: string;
	precioReferencial: number;
	puntajeSca: number | null;
	proceso: string;
	esEspecialidad: boolean;
}

export function fetchPublicCatalogo(): Promise<CatalogoItem[]> {
	return geoFetch<CatalogoItem[]>('/public/catalogo/');
}

