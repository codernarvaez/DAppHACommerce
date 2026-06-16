import type { Locale } from './locales';

const es = {
	meta: {
		title: 'Origin Tech | Ecosistema de Comercio Especializado',
		description:
			'Marketplace directo de origen para lotes trazables de café y cacao con subastas en vivo.',
	},
	lang: {
		switcherLabel: 'Seleccionar idioma',
	},
	nav: {
		market: 'Mercado',
		auctions: 'Subastas',
		wallet: 'Billetera',
		profile: 'Perfil',
	},
	hero: {
		eyebrow: 'COSECHA PREMIUM 2024',
		title: 'Ecosistema de Comercio Especializado',
		lede:
			'Marketplace directo de origen para lotes trazables de café y cacao con verificación limpia, subastas en vivo y abastecimiento profesional.',
		browse: 'Ver inventario',
		auctions: 'Subastas en vivo',
	},
	filters: {
		aria: 'Filtros',
		toggle: 'Filtros',
		typeAll: 'Tipo: Todos',
		origin: 'Origen',
		score: 'Puntaje: 85+',
		process: 'Proceso',
	},
	market: {
		catalogErrorTitle: 'Catálogo no disponible.',
		catalogErrorHint: 'Asegúrate de ejecutar el backend en el puerto 8000.',
		emptyTitle: 'Sin productos publicados.',
		emptyBody: 'Registra lotes y productos desde la API para ver el catálogo en vivo.',
		openApi: 'Abrir API Docs',
		stock: '{count} u.',
		viewProduct: 'Ver {title}',
		labelAuction: 'SUBASTA',
		labelDirect: 'COMPRA DIRECTA',
		priceBid: 'Puja actual',
		priceDirect: 'Precio directo',
		defaultDescription: 'Lote trazable disponible en el marketplace.',
	},
	auction: {
		eyebrow: 'Integridad verificable.',
		body:
			'Catálogo conectado en tiempo real con la API FastAPI. Productos y subastas activas se sincronizan desde Supabase en cada visita.',
		productsInCatalog: 'Productos en catálogo',
		activeAuctions: 'Subastas activas',
		liveSection: 'Subastas en vivo',
		liveSectionBody: 'Precios y tiempos actualizados desde el backend.',
		currentBid: 'Puja actual',
		initial: 'Inicial',
		closes: 'Cierra: {date}',
		ended: 'Finalizada',
		productFallback: 'Producto en subasta',
		status: {
			activa: 'Activa',
			programada: 'Programada',
			finalizada: 'Finalizada',
			cancelada: 'Cancelada',
		},
	},
	api: {
		online: 'API conectada',
		offline: 'API offline',
	},
	footer: {
		tagline: 'La infraestructura digital para la próxima generación del comercio agrícola especializado.',
		platform: 'Plataforma',
		marketplace: 'Marketplace',
		traceability: 'Hub de trazabilidad',
		sustainability: 'Sostenibilidad',
		resources: 'Recursos',
		apiReference: 'Referencia API',
		documentation: 'Documentación',
		privacy: 'Política de privacidad',
	},
	errors: {
		backendOffline:
			'No se pudo conectar con el backend. Verifica que la API esté en ejecución.',
		catalogUnknown: 'Error desconocido al cargar el catálogo.',
	},
	categories: {
		Café: 'Café',
		Cacao: 'Cacao',
		Specialty: 'Especialidad',
	},
} as const;

const en: typeof es = {
	meta: {
		title: 'Origin Tech | Specialty Trade Ecosystem',
		description:
			'Direct-to-origin marketplace for traceable coffee and cacao lots with live auctions.',
	},
	lang: {
		switcherLabel: 'Select language',
	},
	nav: {
		market: 'Market',
		auctions: 'Auctions',
		wallet: 'Wallet',
		profile: 'Profile',
	},
	hero: {
		eyebrow: 'PREMIUM HARVEST 2024',
		title: 'Specialty Trade Ecosystem',
		lede:
			'Direct-to-origin marketplace for traceable coffee and cacao lots with clean verification, live auctions, and professional sourcing.',
		browse: 'Browse inventory',
		auctions: 'Live auctions',
	},
	filters: {
		aria: 'Filters',
		toggle: 'Filters',
		typeAll: 'Type: All',
		origin: 'Origin',
		score: 'Score: 85+',
		process: 'Process',
	},
	market: {
		catalogErrorTitle: 'Catalog unavailable.',
		catalogErrorHint: 'Make sure the backend is running on port 8000.',
		emptyTitle: 'No published products.',
		emptyBody: 'Register lots and products via the API to see the live catalog.',
		openApi: 'Open API Docs',
		stock: '{count} units',
		viewProduct: 'View {title}',
		labelAuction: 'AUCTION',
		labelDirect: 'DIRECT BUY',
		priceBid: 'Current bid',
		priceDirect: 'Direct price',
		defaultDescription: 'Traceable lot available on the marketplace.',
	},
	auction: {
		eyebrow: 'Verifiable integrity.',
		body:
			'Catalog connected in real time to the FastAPI backend. Products and active auctions sync from Supabase on every visit.',
		productsInCatalog: 'Products in catalog',
		activeAuctions: 'Active auctions',
		liveSection: 'Live auctions',
		liveSectionBody: 'Prices and timers updated from the backend.',
		currentBid: 'Current bid',
		initial: 'Initial',
		closes: 'Closes: {date}',
		ended: 'Ended',
		productFallback: 'Product at auction',
		status: {
			activa: 'Active',
			programada: 'Scheduled',
			finalizada: 'Ended',
			cancelada: 'Cancelled',
		},
	},
	api: {
		online: 'API connected',
		offline: 'API offline',
	},
	footer: {
		tagline: 'The digital infrastructure for the next generation of specialty agricultural trade.',
		platform: 'Platform',
		marketplace: 'Marketplace',
		traceability: 'Traceability Hub',
		sustainability: 'Sustainability',
		resources: 'Resources',
		apiReference: 'API Reference',
		documentation: 'Documentation',
		privacy: 'Privacy Policy',
	},
	errors: {
		backendOffline: 'Could not connect to the backend. Verify the API is running.',
		catalogUnknown: 'Unknown error loading the catalog.',
	},
	categories: {
		Café: 'Coffee',
		Cacao: 'Cacao',
		Specialty: 'Specialty',
	},
};

const zh: typeof es = {
	meta: {
		title: 'Origin Tech | 专业贸易生态系统',
		description: '可追溯咖啡和可可批次的一产地直采市场，支持实时拍卖。',
	},
	lang: {
		switcherLabel: '选择语言',
	},
	nav: {
		market: '市场',
		auctions: '拍卖',
		wallet: '钱包',
		profile: '个人资料',
	},
	hero: {
		eyebrow: '2024 优质采收',
		title: '专业贸易生态系统',
		lede: '可追溯咖啡和可可批次的一产地直采市场，提供清晰验证、实时拍卖和专业采购。',
		browse: '浏览库存',
		auctions: '实时拍卖',
	},
	filters: {
		aria: '筛选',
		toggle: '筛选',
		typeAll: '类型：全部',
		origin: '产地',
		score: '评分：85+',
		process: '处理法',
	},
	market: {
		catalogErrorTitle: '目录不可用。',
		catalogErrorHint: '请确保后端在 8000 端口运行。',
		emptyTitle: '暂无已发布产品。',
		emptyBody: '通过 API 注册批次和产品以查看实时目录。',
		openApi: '打开 API 文档',
		stock: '{count} 件',
		viewProduct: '查看 {title}',
		labelAuction: '拍卖',
		labelDirect: '直接购买',
		priceBid: '当前出价',
		priceDirect: '直购价格',
		defaultDescription: '市场上可购买的可追溯批次。',
	},
	auction: {
		eyebrow: '可验证的完整性。',
		body: '目录与 FastAPI 后端实时连接。每次访问时从 Supabase 同步产品和活跃拍卖。',
		productsInCatalog: '目录产品数',
		activeAuctions: '活跃拍卖',
		liveSection: '进行中的拍卖',
		liveSectionBody: '价格和倒计时由后端更新。',
		currentBid: '当前出价',
		initial: '起拍价',
		closes: '结束：{date}',
		ended: '已结束',
		productFallback: '拍卖产品',
		status: {
			activa: '进行中',
			programada: '已安排',
			finalizada: '已结束',
			cancelada: '已取消',
		},
	},
	api: {
		online: 'API 已连接',
		offline: 'API 离线',
	},
	footer: {
		tagline: '为下一代专业农产品贸易打造的数字基础设施。',
		platform: '平台',
		marketplace: '市场',
		traceability: '追溯中心',
		sustainability: '可持续发展',
		resources: '资源',
		apiReference: 'API 参考',
		documentation: '文档',
		privacy: '隐私政策',
	},
	errors: {
		backendOffline: '无法连接后端。请确认 API 正在运行。',
		catalogUnknown: '加载目录时发生未知错误。',
	},
	categories: {
		Café: '咖啡',
		Cacao: '可可',
		Specialty: '精品',
	},
};

const fr: typeof es = {
	meta: {
		title: 'Origin Tech | Écosystème de commerce spécialisé',
		description:
			'Marketplace direct à l’origine pour lots traçables de café et cacao avec enchères en direct.',
	},
	lang: {
		switcherLabel: 'Choisir la langue',
	},
	nav: {
		market: 'Marché',
		auctions: 'Enchères',
		wallet: 'Portefeuille',
		profile: 'Profil',
	},
	hero: {
		eyebrow: 'RÉCOLTE PREMIUM 2024',
		title: 'Écosystème de commerce spécialisé',
		lede:
			'Marketplace direct à l’origine pour lots traçables de café et cacao avec vérification claire, enchères en direct et approvisionnement professionnel.',
		browse: 'Parcourir l’inventaire',
		auctions: 'Enchères en direct',
	},
	filters: {
		aria: 'Filtres',
		toggle: 'Filtres',
		typeAll: 'Type : Tous',
		origin: 'Origine',
		score: 'Score : 85+',
		process: 'Processus',
	},
	market: {
		catalogErrorTitle: 'Catalogue indisponible.',
		catalogErrorHint: 'Assurez-vous que le backend tourne sur le port 8000.',
		emptyTitle: 'Aucun produit publié.',
		emptyBody: 'Enregistrez des lots et produits via l’API pour voir le catalogue en direct.',
		openApi: 'Ouvrir la doc API',
		stock: '{count} u.',
		viewProduct: 'Voir {title}',
		labelAuction: 'ENCHÈRE',
		labelDirect: 'ACHAT DIRECT',
		priceBid: 'Offre actuelle',
		priceDirect: 'Prix direct',
		defaultDescription: 'Lot traçable disponible sur le marketplace.',
	},
	auction: {
		eyebrow: 'Intégrité vérifiable.',
		body:
			'Catalogue connecté en temps réel à l’API FastAPI. Produits et enchères actives synchronisés depuis Supabase à chaque visite.',
		productsInCatalog: 'Produits au catalogue',
		activeAuctions: 'Enchères actives',
		liveSection: 'Enchères en cours',
		liveSectionBody: 'Prix et délais mis à jour depuis le backend.',
		currentBid: 'Offre actuelle',
		initial: 'Initiale',
		closes: 'Clôture : {date}',
		ended: 'Terminée',
		productFallback: 'Produit aux enchères',
		status: {
			activa: 'Active',
			programada: 'Programmée',
			finalizada: 'Terminée',
			cancelada: 'Annulée',
		},
	},
	api: {
		online: 'API connectée',
		offline: 'API hors ligne',
	},
	footer: {
		tagline:
			'L’infrastructure numérique pour la prochaine génération du commerce agricole spécialisé.',
		platform: 'Plateforme',
		marketplace: 'Marketplace',
		traceability: 'Hub de traçabilité',
		sustainability: 'Durabilité',
		resources: 'Ressources',
		apiReference: 'Référence API',
		documentation: 'Documentation',
		privacy: 'Politique de confidentialité',
	},
	errors: {
		backendOffline:
			'Impossible de se connecter au backend. Vérifiez que l’API est en cours d’exécution.',
		catalogUnknown: 'Erreur inconnue lors du chargement du catalogue.',
	},
	categories: {
		Café: 'Café',
		Cacao: 'Cacao',
		Specialty: 'Spécialité',
	},
};

export const messages = { es, en, zh, fr } as const;

export type Messages = (typeof messages)[Locale];

export function getMessages(locale: Locale): Messages {
	return messages[locale];
}

export function translateCategory(locale: Locale, category: string): string {
	const glossary = messages[locale].categories as Record<string, string>;
	return glossary[category] ?? category.toUpperCase();
}

export function interpolate(
	template: string,
	params: Record<string, string | number>,
): string {
	return template.replace(/\{(\w+)\}/g, (_, key: string) => String(params[key] ?? ''));
}
