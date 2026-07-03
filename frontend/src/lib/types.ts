export type EstadoProducto = 'borrador' | 'publicado' | 'agotado' | 'inactivo';
export type EstadoSubasta = 'programada' | 'activa' | 'finalizada' | 'cancelada';
export type EstadoLote = 'registrado' | 'verificado' | 'publicado';

export interface Lote {
	id: string;
	productor_id: string;
	codigo_lote: string;
	variedad: string;
	fecha_cosecha: string;
	peso_kg: number;
	proceso: string;
	origen_geo: string;
	estado: EstadoLote;
	tx_hash?: string;
}

export interface Producto {
	id: string;
	lote_id: string;
	nombre: string;
	descripcion: string;
	categoria: string;
	imagenes: string[];
	precio_base: string | number;
	stock_disponible: number;
	estado: EstadoProducto;
	created_at: string;
}

export interface Subasta {
	id: string;
	producto_id: string;
	productor_id: string;
	precio_inicial: string | number;
	precio_actual: string | number;
	fecha_inicio: string;
	fecha_fin: string;
	estado: EstadoSubasta;
	created_at: string;
}

export interface MarketItem {
	id: string;
	title: string;
	description: string;
	origin: string;
	price: string;
	priceLabel: string;
	label: string;
	accent: string;
	stock: number;
	subastaId?: string;
	estado: EstadoProducto;
}

export interface AuctionItem {
	id: string;
	productoId: string;
	productName: string;
	categoria: string;
	precioActual: string;
	precioInicial: string;
	fechaFin: string;
	estado: EstadoSubasta;
	estadoLabel: string;
}

export interface CatalogData {
	items: MarketItem[];
	auctions: AuctionItem[];
	stats: {
		productCount: number;
		auctionCount: number;
		publishedCount: number;
	};
	apiOnline: boolean;
	error?: string;
}
