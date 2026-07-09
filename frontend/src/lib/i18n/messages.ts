import type { Locale } from './locales';

export const es = {
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
	productDetail: {
		chronology: 'Cronología del Producto',
		purchase: {
			price: 'Precio',
			weight: 'Peso',
			stock: 'Stock',
			varietal: 'Varietal',
			buy: 'Comprar',
		},
		producerInfo: {
			producer: 'Productor',
		}
	},
	checkoutSteps: {
		detail: 'DETALLE',
		pay: 'PAGO',
	},
	checkout: {
		title: 'Checkout - DApp HA Commerce',
		description: 'Pasarela de pagos',
		paymentMethods: {
			title: 'Métodos de Pagos Avanzada',
			subtitle: 'Selecciona su método de pago preferido para procesar la transacción de forma segura.',
			card: 'TARJETA',
			cardDesc: 'Crédito o Débito',
			bank: 'TRANSFERENCIA',
			bankDesc: 'Banca Nacional',
			crypto: 'WEB3 / DEX',
			cryptoDesc: 'Crypto Wallet',
		},
		paymentForms: {
			card: {
				title:'Datos de la Tarjeta',
				cardHolder: 'TITULAR DE LA TARJETA',
				cardHolderPlaceholder: 'NOMBRE COMPLETO',
				cardNumber: 'NÚMERO DE TARJETA',
				cardExpiry: 'EXPIRACIÓN',
				cardCvc: 'CVC / CVV',
				saveCard: 'Guardar esta tarjeta para futuras compras.',
			},
			bank: {
				bankFormSubtitle:'Transferencia Bancaria',
				label: 'BANCO',
				account: 'CUENTA (IBAN)',
				reference: 'REFERENCIA',
				note: 'Nota:', 
				noteInfo: 'El pedido se procesará una vez confirmada la recepción de los fondos (aprox. 24-48h).', 
			},
			web3: {
				title:'Connect your Wallet',
				description: 'Soportamos MetaMask, WalletConnect y Phantom. Transacción nativa en USDC, USDT o ETH.',
			},
		},
		orderSummary: {
			title: 'RESUMEN DEL PEDIDO',
			subtotal: 'Subtotal',
			tax: 'Impuestos (IVA {rate}%)',
			discount: 'Descuento ({code})',
			total: 'TOTAL',
			itemQty: 'QTY: {qty}',
		},
		buttons: {
			confirmPay: 'CONFIRMAR Y PAGAR',
			connectWallet: 'CONNECT WALLET',
		},
		security: 'CONEXIÓN CIFRADA DE 256 BITS',
	},
	login: {
		name: 'Iniciar Sesión',
		welcome: 'Bienvenido de Nuevo',
		email: 'Correo electronico',
		password: 'Contrasena',
		google: 'Continuar con Google',
		text: 'No tienes cuenta?',
		register: 'Regístrate',
	},
	callback: {
		loader: 'Sincronizando tu cuenta con CoffeeTrace Market...',
		statusText: 'Por favor, espera un momento.',
	}
};

export const en: typeof es = {
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
	productDetail: {
		chronology: 'Product Timeline',
		purchase: {
			price: 'Price',
			weight: 'Weight',
			stock: 'Stock',
			varietal: 'Varietal',
			buy: 'Buy',
		},
		producerInfo: {
			producer: 'Producer',
		}
	},	
	checkoutSteps: {
		detail: 'DETAIL',
		pay: 'PAYMENT',
	},	
	checkout: {
		title: 'Checkout - DApp HA Commerce',
		description: 'Payment Gateway',
		paymentMethods: {
			title: 'Advanced Payment Methods',
			subtitle: 'Select your preferred payment method to process the transaction securely.',
			card: 'CARD',
			cardDesc: 'Credit or Debit',
			bank: 'BANK TRANSFER',
			bankDesc: 'National Banking',
			crypto: 'WEB3 / DEX',
			cryptoDesc: 'Crypto Wallet',
		},
		paymentForms: {
			card: {
				title: 'Card Details',
				cardHolder: 'CARDHOLDER',
				cardHolderPlaceholder: 'FULL NAME',
				cardNumber: 'CARD NUMBER',
				cardExpiry: 'EXPIRY DATE',
				cardCvc: 'CVC / CVV',
				saveCard: 'Save this card for future purchases.',
			},
			bank: {
				bankFormSubtitle: 'Bank Transfer',
				label: 'BANK',
				account: 'ACCOUNT (IBAN)',
				reference: 'REFERENCE',
				note: 'Note:',
				noteInfo: 'The order will be processed once receipt of funds has been confirmed (approx. 24-48h).',
			},
			web3: {
				title: 'Connect your Wallet',
				description: 'We support MetaMask, WalletConnect and Phantom. Native transactions in USDC, USDT or ETH.',
			},
		},
		orderSummary: {
			title: 'ORDER SUMMARY',
			subtotal: 'Subtotal',
			tax: 'Taxes (VAT {rate}%)',
			discount: 'Discount ({code})',
			total: 'TOTAL',
			itemQty: 'QTY: {qty}'
		},
		buttons: {
			confirmPay: 'CONFIRM AND PAY',
			connectWallet: 'CONNECT WALLET',
		},
		security: '256-BIT ENCRYPTED CONNECTION',
	},
	login: {
		name: 'Login',
		welcome: 'Welcome Back',
		email: 'Email',
		password: 'Password',
		google: 'Continue with Google',
		text: "Don't have an account?",
		register: "Sign Up",
	},
	callback: {
		loader: 'Syncing your account with CoffeeTrace Market...',
		statusText: 'Please wait a moment.',
	}
};

export const zh: typeof es = {
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
	productDetail: {
		chronology: '产品时间线',
		purchase: {
			price: '价格',
			weight: '重量',
			stock: '库存',
			varietal: '品种',
			buy: '购买',
		},
		producerInfo: {
			producer: '生产商',
		}
	},	
	checkoutSteps: {
		detail: '详情',
		pay: '支付',
	},	
	checkout: {
		title: '结账 - DApp HA Commerce',
		description: '支付网关',
		paymentMethods: {
			title: '高级支付方式',
			subtitle: '请选择您偏好的支付方式，以安全地完成交易。',
			card: '银行卡',
			cardDesc: '信用卡或借记卡',
			bank: '银行转账',
			bankDesc: '国家银行',
			crypto: 'WEB3 / DEX',
			cryptoDesc: '加密钱包',
		},
		paymentForms: {
			card: {
				title: '银行卡信息',
				cardHolder: '持卡人姓名',
				cardHolderPlaceholder: '完整姓名',
				cardNumber: '卡号',
				cardExpiry: '有效期',
				cardCvc: '安全码（CVC / CVV）',
				saveCard: '保存此卡以供将来购买使用。',
			},
			bank: {
				bankFormSubtitle: '银行转账',
				label: '银行',
				account: '账户（IBAN）',
				reference: '参考号',
				note: '注意：',
				noteInfo: '确认收到款项后才会处理订单（约 24-48 小时）。',
			},
			web3: {
				title: '连接您的钱包',
				description: '支持 MetaMask、WalletConnect 和 Phantom。支持 USDC、USDT 或 ETH 原生交易。',
			},
		},
		orderSummary: {
			title: '订单摘要',
			subtotal: '小计',
			tax: '税费（增值税 {rate}%）',
			discount: '折扣（{code}）',
			total: '总计',
			itemQty: '数量：{qty}'
		},
		buttons: {
			confirmPay: '确认并支付',
			connectWallet: '连接钱包',
		},
		security: '256 位加密连接',
	},
	login: {
		name: '登录',
		welcome: '欢迎回来',
		email: '电子邮箱',
		password: '密码',
		google: '使用 Google 继续',
		text: "还没有账号？",
		register: "注册"
	},
	callback: {
		loader: '正在将您的账户与 CoffeeTrace Market 同步...',
		statusText: '请稍候。',
	}	
};

export const fr: typeof es = {
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
	productDetail: {
		chronology: 'Chronologie du produit',
		purchase: {
			price: 'Prix',
			weight: 'Poids',
			stock: 'Stock',
			varietal: 'Variété',
			buy: 'Acheter',
		},
		producerInfo: {
			producer: 'Producteur',
		}
	},	
	checkoutSteps: {
		detail: 'DÉTAILS',
		pay: 'PAIEMENT',
	},	
	checkout: {
		title: 'Paiement - DApp HA Commerce',
		description: 'Passerelle de paiement',
		paymentMethods: {
			title: 'Méthodes de paiement avancées',
			subtitle: 'Sélectionnez votre méthode de paiement préférée pour traiter la transaction en toute sécurité.',
			card: 'CARTE',
			cardDesc: 'Crédit ou Débit',
			bank: 'VIREMENT BANCAIRE',
			bankDesc: 'Banque nationale',
			crypto: 'WEB3 / DEX',
			cryptoDesc: 'Portefeuille crypto',
		},
		paymentForms: {
			card: {
				title: 'Informations de la carte',
				cardHolder: 'TITULAIRE DE LA CARTE',
				cardHolderPlaceholder: 'NOM COMPLET',
				cardNumber: 'NUMÉRO DE CARTE',
				cardExpiry: "DATE D'EXPIRATION",
				cardCvc: 'Code de sécurité (CVC / CVV)',
				saveCard: 'Enregistrer cette carte pour de futurs achats.',
			},
			bank: {
				bankFormSubtitle: 'Virement bancaire',
				label: 'BANQUE',
				account: 'COMPTE (IBAN)',
				reference: 'RÉFÉRENCE',
				note: 'Remarque :',
				noteInfo: 'La commande sera traitée une fois la réception des fonds confirmée (env. 24 à 48 h).',
			},
			web3: {
				title: 'Connectez votre portefeuille',
				description: 'Nous prenons en charge MetaMask, WalletConnect et Phantom. Transactions natives en USDC, USDT ou ETH.',
			},
		},
		orderSummary: {
			title: 'RÉCAPITULATIF DE LA COMMANDE',
			subtotal: 'Sous-total',
			tax: 'Taxes (TVA {rate}%)',
			discount: 'Réduction ({code})',
			total: 'TOTAL',
			itemQty: 'QTÉ : {qty}'
		},
		buttons: {
			confirmPay: 'CONFIRMER ET PAYER',
			connectWallet: 'CONNECTER LE PORTEFEUILLE',
		},
		security: 'CONNEXION CHIFFRÉE 256 BITS',
	},
	login: {
		name: 'Connexion',
		welcome: 'Bon retour',
		email: 'E-mail',
		password: 'Mot de passe',
		google: 'Continuer avec Google',
		text: "Vous n'avez pas de compte ?",
		register: "S'inscrire",		
	},
	callback: {
		loader: 'Synchronisation de votre compte avec CoffeeTrace Market...',
		statusText: 'Veuillez patienter un instant.',
	}		
};

export const ru: typeof es = {
	meta: {
		title: 'Origin Tech | Экосистема специализированной торговли',
		description:
			'Маркетплейс прямых поставок с места происхождения для отслеживаемых партий кофе и какао с живыми аукционами.',
	},
	lang: {
		switcherLabel: 'Выбрать язык',
	},
	nav: {
		market: 'Маркетплейс',
		auctions: 'Аукционы',
		wallet: 'Кошелёк',
		profile: 'Профиль',
	},
	hero: {
		eyebrow: 'ПРЕМИАЛЬНЫЙ УРОЖАЙ 2024',
		title: 'Экосистема специализированной торговли',
		lede:
			'Маркетплейс прямых поставок с места происхождения для отслеживаемых партий кофе и какао с прозрачной проверкой, живыми аукционами и профессиональными закупками.',
		browse: 'Просмотреть каталог',
		auctions: 'Живые аукционы',
	},
	filters: {
		aria: 'Фильтры',
		toggle: 'Фильтры',
		typeAll: 'Тип: Все',
		origin: 'Происхождение',
		score: 'Оценка: 85+',
		process: 'Обработка',
	},
	market: {
		catalogErrorTitle: 'Каталог недоступен.',
		catalogErrorHint: 'Убедитесь, что backend запущен на порту 8000.',
		emptyTitle: 'Нет опубликованных товаров.',
		emptyBody: 'Зарегистрируйте партии и товары через API, чтобы увидеть каталог в реальном времени.',
		openApi: 'Открыть документацию API',
		stock: '{count} шт.',
		viewProduct: 'Просмотреть {title}',
		labelAuction: 'АУКЦИОН',
		labelDirect: 'ПРЯМАЯ ПОКУПКА',
		priceBid: 'Текущая ставка',
		priceDirect: 'Прямая цена',
		defaultDescription: 'Отслеживаемая партия, доступная на маркетплейсе.',
	},
	auction: {
		eyebrow: 'Проверяемая прозрачность.',
		body:
			'Каталог подключён к API FastAPI в реальном времени. Товары и активные аукционы синхронизируются из Supabase при каждом посещении.',
		productsInCatalog: 'Товаров в каталоге',
		activeAuctions: 'Активные аукционы',
		liveSection: 'Живые аукционы',
		liveSectionBody: 'Цены и сроки обновляются напрямую из backend.',
		currentBid: 'Текущая ставка',
		initial: 'Начальная',
		closes: 'Завершается: {date}',
		ended: 'Завершён',
		productFallback: 'Товар на аукционе',
		status: {
			activa: 'Активен',
			programada: 'Запланирован',
			finalizada: 'Завершён',
			cancelada: 'Отменён',
		},
	},
	api: {
		online: 'API подключён',
		offline: 'API недоступен',
	},
	footer: {
		tagline:
			'Цифровая инфраструктура для следующего поколения специализированной сельскохозяйственной торговли.',
		platform: 'Платформа',
		marketplace: 'Маркетплейс',
		traceability: 'Центр прослеживаемости',
		sustainability: 'Устойчивое развитие',
		resources: 'Ресурсы',
		apiReference: 'Справочник API',
		documentation: 'Документация',
		privacy: 'Политика конфиденциальности',
	},
	errors: {
		backendOffline:
			'Не удалось подключиться к backend. Проверьте, что API запущен.',
		catalogUnknown: 'Неизвестная ошибка при загрузке каталога.',
	},
	categories: {
		Café: 'Кофе',
		Cacao: 'Какао',
		Specialty: 'Спешелти',
	},
	productDetail: {
		chronology: 'Хронология продукта',
		purchase: {
			price: 'Цена',
			weight: 'Вес',
			stock: 'Запас',
			varietal: 'Сорт',
			buy: 'Купить',
		},
		producerInfo: {
			producer: 'Производитель',
		}
	},
	checkoutSteps: {
		detail: 'ДЕТАЛИ',
		pay: 'ОПЛАТА',
	},
	checkout: {
		title: 'Оформление заказа — DApp HA Commerce',
		description: 'Платёжный шлюз',
		paymentMethods: {
			title: 'Расширенные способы оплаты',
			subtitle:
				'Выберите предпочтительный способ оплаты для безопасной обработки транзакции.',
			card: 'КАРТА',
			cardDesc: 'Кредитная или дебетовая карта',
			bank: 'БАНКОВСКИЙ ПЕРЕВОД',
			bankDesc: 'Национальная банковская система',
			crypto: 'WEB3 / DEX',
			cryptoDesc: 'Криптокошелёк',
		},
		paymentForms: {
			card: {
				title: 'Данные карты',
				cardHolder: 'ДЕРЖАТЕЛЬ КАРТЫ',
				cardHolderPlaceholder: 'ПОЛНОЕ ИМЯ',
				cardNumber: 'НОМЕР КАРТЫ',
				cardExpiry: 'СРОК ДЕЙСТВИЯ',
				cardCvc: 'CVC / CVV',
				saveCard: 'Сохранить эту карту для будущих покупок.',
			},
			bank: {
				bankFormSubtitle: 'Банковский перевод',
				label: 'БАНК',
				account: 'СЧЁТ (IBAN)',
				reference: 'НАЗНАЧЕНИЕ ПЛАТЕЖА',
				note: 'Примечание:',
				noteInfo:
					'Заказ будет обработан после подтверждения поступления средств (примерно 24–48 часов).',
			},
			web3: {
				title: 'Подключите кошелёк',
				description:
					'Поддерживаются MetaMask, WalletConnect и Phantom. Нативные транзакции в USDC, USDT или ETH.',
			},
		},
		orderSummary: {
			title: 'СВОДКА ЗАКАЗА',
			subtotal: 'Промежуточный итог',
			tax: 'Налог (НДС {rate}%)',
			discount: 'Скидка ({code})',
			total: 'ИТОГО',
			itemQty: 'КОЛ-ВО: {qty}',
		},
		buttons: {
			confirmPay: 'ПОДТВЕРДИТЬ И ОПЛАТИТЬ',
			connectWallet: 'ПОДКЛЮЧИТЬ КОШЕЛЁК',
		},
		security: '256-БИТНОЕ ЗАШИФРОВАННОЕ СОЕДИНЕНИЕ',
	},
	login: {
		name: 'Войти',
		welcome: 'С возвращением',
		email: 'Электронная почта',
		password: 'Пароль',
		google: 'Продолжить с Google',
		text: "Нет аккаунта?",
		register: "Зарегистрироваться",
	},
	callback: {
		loader: 'Синхронизация вашей учетной записи с CoffeeTrace Market...',
		statusText: 'Пожалуйста, подождите немного.',
	}	
};

export const messages = { es, en, zh, fr, ru } as const;

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
