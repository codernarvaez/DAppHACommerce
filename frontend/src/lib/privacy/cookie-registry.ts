import type { Locale } from '../i18n/locales';
import { LOCALE_COOKIE } from '../i18n/locales';
import { CONSENT_COOKIE } from './consent';

export type CookiePurpose = 'essential' | 'functional' | 'analytics' | 'marketing';

export interface SiteCookieDefinition {
	name: string;
	purpose: CookiePurpose;
	duration: string;
	provider: string;
}

export const SITE_COOKIES: SiteCookieDefinition[] = [
	{
		name: CONSENT_COOKIE,
		purpose: 'essential',
		duration: '12 months',
		provider: 'Origin Tech',
	},
	{
		name: LOCALE_COOKIE,
		purpose: 'functional',
		duration: '12 months',
		provider: 'Origin Tech',
	},
];

export function getCookieLabel(locale: Locale, purpose: CookiePurpose): string {
	const labels: Record<Locale, Record<CookiePurpose, string>> = {
		es: {
			essential: 'Esenciales',
			functional: 'Funcionales',
			analytics: 'Analíticas',
			marketing: 'Marketing',
		},
		en: {
			essential: 'Essential',
			functional: 'Functional',
			analytics: 'Analytics',
			marketing: 'Marketing',
		},
		zh: {
			essential: '必要',
			functional: '功能',
			analytics: '分析',
			marketing: '营销',
		},
		fr: {
			essential: 'Essentiels',
			functional: 'Fonctionnels',
			analytics: 'Analytiques',
			marketing: 'Marketing',
		},
		ru: {
			essential: 'Обязательные',
			functional: 'Функциональные',
			analytics: 'Аналитические',
			marketing: 'Маркетинговые',
		},
	};
	return labels[locale][purpose];
}
