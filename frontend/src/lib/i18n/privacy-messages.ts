import type { Locale } from './locales';

export const es = {
	cookies: {
		bannerTitle: 'Respetamos tu privacidad',
		bannerBody:
			'Utilizamos cookies esenciales para el funcionamiento del sitio y, con tu consentimiento, cookies funcionales para recordar idioma y preferencias. Consulta nuestra política conforme a la LOPDP de Ecuador.',
		acceptAll: 'Aceptar todas',
		rejectOptional: 'Solo esenciales',
		customize: 'Personalizar',
		save: 'Guardar preferencias',
		modalTitle: 'Centro de preferencias de cookies',
		modalBody:
			'Puedes activar o desactivar las categorías no esenciales. Las cookies esenciales son necesarias para operar el marketplace y registrar tu decisión.',
		alwaysOn: 'Siempre activas',
		essentialTitle: 'Cookies esenciales',
		essentialDesc: 'Necesarias para seguridad, consentimiento y operación básica del sitio.',
		functionalTitle: 'Cookies funcionales',
		functionalDesc: 'Recuerdan idioma y preferencias de navegación para mejorar tu experiencia.',
		analyticsTitle: 'Cookies analíticas',
		analyticsDesc: 'Nos ayudan a medir uso agregado del sitio. Actualmente no están activas.',
		marketingTitle: 'Cookies de marketing',
		marketingDesc: 'Permiten personalización comercial. Actualmente no están activas.',
		manageLink: 'Gestionar cookies',
		policyLink: 'Política de privacidad LOPDP',
		tableName: 'Cookie',
		tablePurpose: 'Finalidad',
		tableDuration: 'Duración',
		tableProvider: 'Proveedor',
	},
	legal: {
		pageTitle: 'Política de privacidad y protección de datos (LOPDP)',
		pageDescription:
			'Información sobre el tratamiento de datos personales conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador.',
		lastUpdated: 'Última actualización: junio 2026',
		backHome: 'Volver al marketplace',
		sections: [
			{
				title: '1. Responsable del tratamiento',
				paragraphs: [
					'Origin Tech (CoffeeTrace Market) es responsable del tratamiento de los datos personales recopilados a través de esta plataforma de comercio especializado.',
					'Contacto de privacidad: privacidad@origintech.ec',
				],
			},
			{
				title: '2. Marco legal — LOPDP Ecuador',
				paragraphs: [
					'El tratamiento de datos se realiza conforme a la Ley Orgánica de Protección de Datos Personales (LOPDP), su reglamento y normativa complementaria de la Superintendencia de Protección de Datos Personales.',
					'La base legal incluye consentimiento informado, ejecución contractual y interés legítimo cuando corresponda.',
				],
			},
			{
				title: '3. Datos que tratamos',
				paragraphs: [
					'Identificación y contacto (nombre, correo, teléfono), datos de cuenta y rol, datos comerciales de productos/lotes, datos de subastas y transacciones, dirección de billetera Web3 cuando aplique, y datos técnicos de navegación.',
				],
			},
			{
				title: '4. Finalidades del tratamiento',
				paragraphs: [
					'Registro y autenticación de usuarios, operación del marketplace, trazabilidad de lotes, gestión de subastas y ventas, cumplimiento legal, seguridad de la plataforma y mejora del servicio.',
				],
			},
			{
				title: '5. Derechos del titular',
				paragraphs: [
					'Puedes ejercer acceso, rectificación, eliminación, oposición, limitación del tratamiento y portabilidad escribiendo a privacidad@origintech.ec.',
					'Tienes derecho a retirar el consentimiento en cualquier momento sin afectar la licitud del tratamiento previo.',
				],
			},
			{
				title: '6. Cookies y tecnologías similares',
				paragraphs: [
					'Usamos cookies esenciales para operar el sitio y registrar tu consentimiento. Las cookies funcionales (como idioma) solo se activan si las aceptas.',
					'Puedes modificar tus preferencias en cualquier momento desde el enlace “Gestionar cookies” del pie de página.',
				],
			},
			{
				title: '7. Transferencias y encargados',
				paragraphs: [
					'Los datos pueden alojarse en infraestructura cloud (Supabase/PostgreSQL) con medidas contractuales y técnicas de protección acordes a la LOPDP.',
				],
			},
			{
				title: '8. Conservación',
				paragraphs: [
					'Conservamos los datos mientras exista relación comercial o obligación legal. Los registros de consentimiento de cookies se guardan hasta 12 meses.',
				],
			},
			{
				title: '9. Autoridad de control',
				paragraphs: [
					'Si consideras vulnerados tus derechos, puedes acudir a la Superintendencia de Protección de Datos Personales del Ecuador.',
				],
			},
		],
	},
};

export const en: typeof es = {
	cookies: {
		bannerTitle: 'We respect your privacy',
		bannerBody:
			'We use essential cookies to run the site and, with your consent, functional cookies to remember language and preferences. See our policy under Ecuador’s LOPDP.',
		acceptAll: 'Accept all',
		rejectOptional: 'Essential only',
		customize: 'Customize',
		save: 'Save preferences',
		modalTitle: 'Cookie preference center',
		modalBody:
			'You can enable or disable non-essential categories. Essential cookies are required to operate the marketplace and record your choice.',
		alwaysOn: 'Always active',
		essentialTitle: 'Essential cookies',
		essentialDesc: 'Required for security, consent storage, and basic site operation.',
		functionalTitle: 'Functional cookies',
		functionalDesc: 'Remember language and browsing preferences to improve your experience.',
		analyticsTitle: 'Analytics cookies',
		analyticsDesc: 'Help us measure aggregated site usage. Not currently active.',
		marketingTitle: 'Marketing cookies',
		marketingDesc: 'Enable commercial personalization. Not currently active.',
		manageLink: 'Manage cookies',
		policyLink: 'LOPDP privacy policy',
		tableName: 'Cookie',
		tablePurpose: 'Purpose',
		tableDuration: 'Duration',
		tableProvider: 'Provider',
	},
	legal: {
		pageTitle: 'Privacy & personal data policy (LOPDP)',
		pageDescription:
			'Information on personal data processing under Ecuador’s Organic Law on Personal Data Protection.',
		lastUpdated: 'Last updated: June 2026',
		backHome: 'Back to marketplace',
		sections: [
			{
				title: '1. Data controller',
				paragraphs: [
					'Origin Tech (CoffeeTrace Market) is the controller of personal data collected through this specialty trade platform.',
					'Privacy contact: privacidad@origintech.ec',
				],
			},
			{
				title: '2. Legal framework — Ecuador LOPDP',
				paragraphs: [
					'Processing complies with the Organic Law on Personal Data Protection (LOPDP), its regulations, and guidance from the Personal Data Protection Superintendency.',
					'Legal bases include informed consent, contract performance, and legitimate interest where applicable.',
				],
			},
			{
				title: '3. Data we process',
				paragraphs: [
					'Identity and contact data, account and role data, commercial product/lot data, auction and transaction data, Web3 wallet address when applicable, and technical browsing data.',
				],
			},
			{
				title: '4. Purposes',
				paragraphs: [
					'User registration and authentication, marketplace operation, lot traceability, auction and sales management, legal compliance, platform security, and service improvement.',
				],
			},
			{
				title: '5. Data subject rights',
				paragraphs: [
					'You may exercise access, rectification, erasure, objection, restriction, and portability by emailing privacidad@origintech.ec.',
					'You may withdraw consent at any time without affecting the lawfulness of prior processing.',
				],
			},
			{
				title: '6. Cookies and similar technologies',
				paragraphs: [
					'We use essential cookies to operate the site and record consent. Functional cookies (e.g. language) are enabled only if you accept them.',
					'You can change preferences anytime via “Manage cookies” in the footer.',
				],
			},
			{
				title: '7. Transfers and processors',
				paragraphs: [
					'Data may be hosted on cloud infrastructure (Supabase/PostgreSQL) with contractual and technical safeguards aligned with LOPDP.',
				],
			},
			{
				title: '8. Retention',
				paragraphs: [
					'We retain data while a commercial relationship or legal obligation exists. Cookie consent records are kept for up to 12 months.',
				],
			},
			{
				title: '9. Supervisory authority',
				paragraphs: [
					'If you believe your rights were violated, you may contact Ecuador’s Personal Data Protection Superintendency.',
				],
			},
		],
	},
};

export const zh: typeof es = {
	cookies: {
		bannerTitle: '我们尊重您的隐私',
		bannerBody:
			'我们使用必要 Cookie 运行网站；经您同意后，使用功能 Cookie 记住语言和偏好。请参阅符合厄瓜多尔 LOPDP 的隐私政策。',
		acceptAll: '全部接受',
		rejectOptional: '仅必要',
		customize: '自定义',
		save: '保存偏好',
		modalTitle: 'Cookie 偏好中心',
		modalBody: '您可启用或禁用非必要类别。必要 Cookie 用于运行市场并记录您的选择。',
		alwaysOn: '始终启用',
		essentialTitle: '必要 Cookie',
		essentialDesc: '用于安全、同意记录和网站基本运行。',
		functionalTitle: '功能 Cookie',
		functionalDesc: '记住语言和浏览偏好以改善体验。',
		analyticsTitle: '分析 Cookie',
		analyticsDesc: '帮助统计汇总使用情况。当前未启用。',
		marketingTitle: '营销 Cookie',
		marketingDesc: '用于商业个性化。当前未启用。',
		manageLink: '管理 Cookie',
		policyLink: 'LOPDP 隐私政策',
		tableName: 'Cookie',
		tablePurpose: '用途',
		tableDuration: '期限',
		tableProvider: '提供方',
	},
	legal: {
		pageTitle: '隐私与个人数据政策（LOPDP）',
		pageDescription: '根据厄瓜多尔《个人数据保护法》处理个人数据的信息。',
		lastUpdated: '最后更新：2026年6月',
		backHome: '返回市场',
		sections: [
			{
				title: '1. 数据控制者',
				paragraphs: [
					'Origin Tech（CoffeeTrace Market）是本专业贸易平台所收集个人数据的控制者。',
					'隐私联系：privacidad@origintech.ec',
				],
			},
			{
				title: '2. 法律框架 — 厄瓜多尔 LOPDP',
				paragraphs: [
					'数据处理符合《个人数据保护法》（LOPDP）及其法规和个人数据保护监管机构的指导。',
					'法律依据包括知情同意、合同履行以及适用的合法利益。',
				],
			},
			{
				title: '3. 我们处理的数据',
				paragraphs: [
					'身份与联系信息、账户与角色、产品/批次商业数据、拍卖与交易数据、适用的 Web3 钱包地址及技术浏览数据。',
				],
			},
			{
				title: '4. 处理目的',
				paragraphs: [
					'用户注册与认证、市场运营、批次追溯、拍卖与销售管理、法律合规、平台安全与服务改进。',
				],
			},
			{
				title: '5. 数据主体权利',
				paragraphs: [
					'您可通过 privacidad@origintech.ec 行使访问、更正、删除、反对、限制处理和可携带权。',
					'您可随时撤回同意，不影响此前处理的合法性。',
				],
			},
			{
				title: '6. Cookie 及类似技术',
				paragraphs: [
					'我们使用必要 Cookie 运行网站并记录同意。功能 Cookie（如语言）仅在您接受后启用。',
					'您可随时通过页脚“管理 Cookie”修改偏好。',
				],
			},
			{
				title: '7. 传输与处理者',
				paragraphs: ['数据可能托管于云基础设施（Supabase/PostgreSQL），并采取符合 LOPDP 的合同与技术保障。'],
			},
			{
				title: '8. 保留期限',
				paragraphs: ['在商业关系或法律义务存续期间保留数据。Cookie 同意记录最多保留 12 个月。'],
			},
			{
				title: '9. 监管机构',
				paragraphs: ['如认为权利受到侵害，可向厄瓜多尔个人数据保护监管机构申诉。'],
			},
		],
	},
};

export const fr: typeof es = {
	cookies: {
		bannerTitle: 'Nous respectons votre vie privée',
		bannerBody:
			'Nous utilisons des cookies essentiels pour faire fonctionner le site et, avec votre consentement, des cookies fonctionnels pour mémoriser la langue et vos préférences. Consultez notre politique conforme à la LOPDP de l’Équateur.',
		acceptAll: 'Tout accepter',
		rejectOptional: 'Essentiels uniquement',
		customize: 'Personnaliser',
		save: 'Enregistrer',
		modalTitle: 'Centre de préférences cookies',
		modalBody:
			'Vous pouvez activer ou désactiver les catégories non essentielles. Les cookies essentiels sont requis pour le marketplace et l’enregistrement de votre choix.',
		alwaysOn: 'Toujours actifs',
		essentialTitle: 'Cookies essentiels',
		essentialDesc: 'Nécessaires à la sécurité, au consentement et au fonctionnement de base.',
		functionalTitle: 'Cookies fonctionnels',
		functionalDesc: 'Mémorisent la langue et les préférences de navigation.',
		analyticsTitle: 'Cookies analytiques',
		analyticsDesc: 'Mesurent l’usage agrégé. Non actifs actuellement.',
		marketingTitle: 'Cookies marketing',
		marketingDesc: 'Personnalisation commerciale. Non actifs actuellement.',
		manageLink: 'Gérer les cookies',
		policyLink: 'Politique LOPDP',
		tableName: 'Cookie',
		tablePurpose: 'Finalité',
		tableDuration: 'Durée',
		tableProvider: 'Fournisseur',
	},
	legal: {
		pageTitle: 'Politique de confidentialité et données (LOPDP)',
		pageDescription:
			'Informations sur le traitement des données personnelles selon la loi organique équatorienne sur la protection des données.',
		lastUpdated: 'Dernière mise à jour : juin 2026',
		backHome: 'Retour au marketplace',
		sections: [
			{
				title: '1. Responsable du traitement',
				paragraphs: [
					'Origin Tech (CoffeeTrace Market) est responsable du traitement des données collectées via cette plateforme.',
					'Contact confidentialité : privacidad@origintech.ec',
				],
			},
			{
				title: '2. Cadre juridique — LOPDP Équateur',
				paragraphs: [
					'Le traitement respecte la loi organique sur la protection des données (LOPDP), son règlement et la Superintendance équatorienne.',
					'Les bases légales incluent le consentement éclairé, l’exécution contractuelle et l’intérêt légitime le cas échéant.',
				],
			},
			{
				title: '3. Données traitées',
				paragraphs: [
					'Identité et contact, compte et rôle, données commerciales produits/lots, enchères et transactions, adresse wallet Web3 le cas échéant, et données techniques de navigation.',
				],
			},
			{
				title: '4. Finalités',
				paragraphs: [
					'Inscription et authentification, exploitation du marketplace, traçabilité, enchères et ventes, conformité légale, sécurité et amélioration du service.',
				],
			},
			{
				title: '5. Droits des personnes',
				paragraphs: [
					'Vous pouvez exercer accès, rectification, effacement, opposition, limitation et portabilité via privacidad@origintech.ec.',
					'Vous pouvez retirer votre consentement à tout moment sans affecter la licéité du traitement antérieur.',
				],
			},
			{
				title: '6. Cookies',
				paragraphs: [
					'Cookies essentiels pour le site et le consentement. Cookies fonctionnels (langue) uniquement si acceptés.',
					'Modifiez vos préférences via « Gérer les cookies » en pied de page.',
				],
			},
			{
				title: '7. Transferts et sous-traitants',
				paragraphs: [
					'Hébergement cloud possible (Supabase/PostgreSQL) avec garanties contractuelles et techniques conformes à la LOPDP.',
				],
			},
			{
				title: '8. Conservation',
				paragraphs: [
					'Conservation pendant la relation commerciale ou obligation légale. Consentement cookies conservé jusqu’à 12 mois.',
				],
			},
			{
				title: '9. Autorité de contrôle',
				paragraphs: [
					'En cas de violation présumée, contactez la Superintendance de protection des données personnelles de l’Équateur.',
				],
			},
		],
	},
};

export const ru: typeof es = {
	cookies: {
		bannerTitle: 'Мы уважаем вашу конфиденциальность',
		bannerBody:
			'Мы используем обязательные cookies для работы сайта и, с вашего согласия, функциональные cookies для запоминания языка и предпочтений. Ознакомьтесь с нашей политикой конфиденциальности в соответствии с законодательством Эквадора о защите персональных данных (LOPDP).',
		acceptAll: 'Принять все',
		rejectOptional: 'Только обязательные',
		customize: 'Настроить',
		save: 'Сохранить настройки',
		modalTitle: 'Центр управления cookies',
		modalBody:
			'Вы можете включать или отключать необязательные категории. Обязательные cookies необходимы для работы маркетплейса и сохранения вашего выбора.',
		alwaysOn: 'Всегда активны',
		essentialTitle: 'Обязательные cookies',
		essentialDesc:
			'Необходимы для безопасности, хранения согласия и базовой работы сайта.',
		functionalTitle: 'Функциональные cookies',
		functionalDesc:
			'Запоминают язык и пользовательские настройки для улучшения вашего опыта.',
		analyticsTitle: 'Аналитические cookies',
		analyticsDesc:
			'Помогают нам измерять обобщённое использование сайта. В настоящее время не используются.',
		marketingTitle: 'Маркетинговые cookies',
		marketingDesc:
			'Позволяют персонализировать коммерческие предложения. В настоящее время не используются.',
		manageLink: 'Управление cookies',
		policyLink: 'Политика конфиденциальности (LOPDP)',
		tableName: 'Cookie',
		tablePurpose: 'Назначение',
		tableDuration: 'Срок хранения',
		tableProvider: 'Поставщик',
	},
	legal: {
		pageTitle: 'Политика конфиденциальности и защиты персональных данных (LOPDP)',
		pageDescription:
			'Информация об обработке персональных данных в соответствии с Органическим законом Эквадора о защите персональных данных (LOPDP).',
		lastUpdated: 'Последнее обновление: июнь 2026',
		backHome: 'Вернуться в маркетплейс',
		sections: [
			{
				title: '1. Оператор персональных данных',
				paragraphs: [
					'Origin Tech (CoffeeTrace Market) является оператором персональных данных, собираемых через данную платформу специализированной торговли.',
					'Контакт по вопросам конфиденциальности: privacidad@origintech.ec',
				],
			},
			{
				title: '2. Правовая база — LOPDP Эквадора',
				paragraphs: [
					'Обработка персональных данных осуществляется в соответствии с Органическим законом о защите персональных данных (LOPDP), его регламентом и дополнительными нормативными актами Суперинтенденции по защите персональных данных.',
					'Правовыми основаниями являются информированное согласие, исполнение договора и законный интерес, когда это применимо.',
				],
			},
			{
				title: '3. Какие данные мы обрабатываем',
				paragraphs: [
					'Идентификационные и контактные данные (имя, электронная почта, телефон), данные учётной записи и роли пользователя, коммерческие данные о товарах и партиях, данные аукционов и транзакций, адрес Web3-кошелька (при необходимости), а также технические данные навигации.',
				],
			},
			{
				title: '4. Цели обработки данных',
				paragraphs: [
					'Регистрация и аутентификация пользователей, работа маркетплейса, прослеживаемость партий, управление аукционами и продажами, соблюдение законодательства, безопасность платформы и улучшение сервиса.',
				],
			},
			{
				title: '5. Права субъекта данных',
				paragraphs: [
					'Вы можете реализовать права на доступ, исправление, удаление, возражение против обработки, ограничение обработки и переносимость данных, написав на privacidad@origintech.ec.',
					'Вы имеете право отозвать согласие в любое время без ущерба для законности ранее осуществлённой обработки.',
				],
			},
			{
				title: '6. Cookies и аналогичные технологии',
				paragraphs: [
					'Мы используем обязательные cookies для работы сайта и фиксации вашего согласия. Функциональные cookies (например, для сохранения языка) активируются только с вашего разрешения.',
					'Вы можете изменить свои настройки в любое время через ссылку «Управление cookies» в нижней части сайта.',
				],
			},
			{
				title: '7. Передача данных и обработчики',
				paragraphs: [
					'Данные могут размещаться в облачной инфраструктуре (Supabase/PostgreSQL) с применением договорных и технических мер защиты, соответствующих требованиям LOPDP.',
				],
			},
			{
				title: '8. Срок хранения',
				paragraphs: [
					'Мы храним данные, пока существуют коммерческие отношения или юридические обязательства. Записи о согласии на использование cookies сохраняются до 12 месяцев.',
				],
			},
			{
				title: '9. Надзорный орган',
				paragraphs: [
					'Если вы считаете, что ваши права были нарушены, вы можете обратиться в Суперинтенденцию по защите персональных данных Эквадора.',
				],
			},
		],
	},
};

export const privacyMessages = { es, en, zh, fr, ru } as const;

export type PrivacyMessages = (typeof privacyMessages)[Locale];

export function getPrivacyMessages(locale: Locale): PrivacyMessages {
	return privacyMessages[locale];
}
