import { checkApiHealth } from './api/client';
import { fetchProductos } from './api/productos';
import { fetchSubastas } from './api/subastas';
import { fetchLotes } from './api/lotes';
import { formatPrice } from './format';
import {
	getMessages,
	interpolate,
	translateCategory,
	type Locale,
} from './i18n';
import type { AuctionItem, CatalogData, MarketItem, Producto, Subasta, Lote } from './types';

const ACCENTS = [
	'from-ruby-500',
	'from-slate-700',
	'from-amber-900',
	'from-emerald-950',
] as const;

const LIVE_AUCTION_STATES = new Set<Subasta['estado']>(['activa', 'programada']);

function pickAccent(index: number): string {
	return ACCENTS[index % ACCENTS.length];
}

function buildMarketItem(
	producto: Producto,
	subasta: Subasta | undefined,
	lote: Lote | undefined,
	index: number,
	locale: Locale,
): MarketItem {
	const m = getMessages(locale);
	const isAuction = Boolean(subasta && LIVE_AUCTION_STATES.has(subasta.estado));

	return {
		id: producto.id,
		title: producto.nombre,
		description: producto.descripcion || m.market.defaultDescription,
		//origin: translateCategory(locale, producto.categoria),
		// Extraer origen real del lote, con un fallback de seguridad
		origin: lote?.origen_geo || translateCategory(locale, producto.categoria),
		price: isAuction
			? formatPrice(subasta!.precio_actual, locale)
			: formatPrice(producto.precio_base, locale),
		priceLabel: isAuction ? m.market.priceBid : m.market.priceDirect,
		label: isAuction ? m.market.labelAuction : m.market.labelDirect,
		accent: pickAccent(index),
		stock: producto.stock_disponible,
		subastaId: subasta?.id,
		estado: producto.estado,
	};
}

function buildAuctionItem(
	subasta: Subasta,
	producto: Producto | undefined,
	locale: Locale,
): AuctionItem {
	const m = getMessages(locale);

	return {
		id: subasta.id,
		productoId: subasta.producto_id,
		productName: producto?.nombre ?? m.auction.productFallback,
		categoria: translateCategory(locale, producto?.categoria ?? 'Specialty'),
		precioActual: formatPrice(subasta.precio_actual, locale),
		precioInicial: formatPrice(subasta.precio_inicial, locale),
		fechaFin: subasta.fecha_fin,
		estado: subasta.estado,
		estadoLabel: m.auction.status[subasta.estado],
	};
}

export async function getCatalogData(locale: Locale): Promise<CatalogData> {
	const m = getMessages(locale);
	const apiOnline = await checkApiHealth();

	if (!apiOnline) {
		return {
			items: [],
			auctions: [],
			stats: { productCount: 0, auctionCount: 0, publishedCount: 0 },
			apiOnline: false,
			error: m.errors.backendOffline,
		};
	}

	try {
		const [productos, subastas, lotes] = await Promise.all([fetchProductos(), fetchSubastas(), fetchLotes()]);

		const subastaByProducto = new Map<string, Subasta>();
		for (const subasta of subastas) {
			if (!LIVE_AUCTION_STATES.has(subasta.estado)) continue;
			const existing = subastaByProducto.get(subasta.producto_id);
			if (!existing || subasta.estado === 'activa') {
				subastaByProducto.set(subasta.producto_id, subasta);
			}
		}

		const productoById = new Map(productos.map((producto) => [producto.id, producto]));

		const loteById = new Map(lotes.map((lote) => [lote.id, lote]));

		const visibleProducts = productos.filter(
			(producto) => producto.estado === 'publicado' || subastaByProducto.has(producto.id),
		);

		const items = visibleProducts.map((producto, index) =>
			buildMarketItem(producto, subastaByProducto.get(producto.id),loteById.get(producto.lote_id), index, locale),
		);

		const auctions = subastas
			.filter((subasta) => LIVE_AUCTION_STATES.has(subasta.estado))
			.map((subasta) => buildAuctionItem(subasta, productoById.get(subasta.producto_id), locale))
			.sort((a, b) => new Date(a.fechaFin).getTime() - new Date(b.fechaFin).getTime());

		return {
			items,
			auctions,
			stats: {
				productCount: productos.length,
				auctionCount: auctions.length,
				publishedCount: productos.filter((producto) => producto.estado === 'publicado').length,
			},
			apiOnline: true,
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : m.errors.catalogUnknown;

		return {
			items: [],
			auctions: [],
			stats: { productCount: 0, auctionCount: 0, publishedCount: 0 },
			apiOnline: true,
			error: message,
		};
	}
}

export { interpolate };
