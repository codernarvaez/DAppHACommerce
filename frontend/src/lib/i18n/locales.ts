export type Locale = 'es' | 'en' | 'zh' | 'fr';

export const LOCALES: { code: Locale; nativeLabel: string }[] = [
	{ code: 'es', nativeLabel: 'Español' },
	{ code: 'en', nativeLabel: 'English' },
	{ code: 'zh', nativeLabel: '中文' },
	{ code: 'fr', nativeLabel: 'Français' },
];

export const DEFAULT_LOCALE: Locale = 'es';

export const LOCALE_COOKIE = 'locale';

export function isLocale(value: string | null | undefined): value is Locale {
	return value === 'es' || value === 'en' || value === 'zh' || value === 'fr';
}

export const LOCALE_BCP47: Record<Locale, string> = {
	es: 'es-ES',
	en: 'en-US',
	zh: 'zh-CN',
	fr: 'fr-FR',
};
