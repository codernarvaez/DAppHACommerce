import { LOCALE_BCP47, type Locale } from './i18n/locales';

const priceSuffix: Record<Locale, string> = {
	es: '/lb',
	en: '/lb',
	zh: '/磅',
	fr: '/lb',
	ru: '/фн',
};

export function formatPrice(
	value: string | number,
	locale: Locale = 'es',
	suffix?: string,
): string {
	const amount = typeof value === 'string' ? Number.parseFloat(value) : value;
	if (Number.isNaN(amount)) return '—';

	const formatted = new Intl.NumberFormat(LOCALE_BCP47[locale], {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	}).format(amount);

	return `${formatted}${suffix ?? priceSuffix[locale]}`;
}

export function formatDateTime(value: string, locale: Locale = 'es'): string {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return '—';

	return new Intl.DateTimeFormat(LOCALE_BCP47[locale], {
		dateStyle: 'medium',
		timeStyle: 'short',
	}).format(date);
}

export function formatRelativeEnd(
	value: string,
	endedLabel: string,
): string {
	const end = new Date(value).getTime();
	const diff = end - Date.now();
	if (Number.isNaN(end)) return '—';
	if (diff <= 0) return endedLabel;

	const hours = Math.floor(diff / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	if (hours >= 24) return `${Math.floor(hours / 24)}d ${hours % 24}h`;
	return `${hours}h ${minutes}m`;
}
