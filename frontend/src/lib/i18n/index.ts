import type { AstroCookies } from 'astro';
import {
	allowsCategory,
	parseConsentCookie,
	type CookieConsentState,
} from '../privacy/consent';
import {
	DEFAULT_LOCALE,
	isLocale,
	LOCALE_COOKIE,
	type Locale,
} from './locales';
import { getMessages, type Messages } from './messages';
import { getPrivacyMessages, type PrivacyMessages } from './privacy-messages';
import { getErrorMessages, type ErrorMessages } from './error-messages';

function parseAcceptLanguage(header: string | null): Locale | null {
	if (!header) return null;

	for (const part of header.split(',')) {
		const code = part.trim().split(';')[0]?.split('-')[0]?.toLowerCase();
		if (code === 'es' || code === 'en' || code === 'zh' || code === 'fr' || code === 'ru') {
			return code;
		}
	}

	return null;
}

export function readConsent(cookies: AstroCookies): CookieConsentState | null {
	return parseConsentCookie(cookies.get('origin_consent')?.value);
}

export function resolveLocale(
	cookies: AstroCookies,
	url: URL,
	request: Request,
	consent: CookieConsentState | null = readConsent(cookies),
): Locale {
	const queryLang = url.searchParams.get('lang');
	if (isLocale(queryLang)) return queryLang;

	if (consent && allowsCategory(consent, 'functional')) {
		const cookieLang = cookies.get(LOCALE_COOKIE)?.value;
		if (isLocale(cookieLang)) return cookieLang;
	}

	return parseAcceptLanguage(request.headers.get('accept-language')) ?? DEFAULT_LOCALE;
}

export function persistLocaleCookie(cookies: AstroCookies, locale: Locale): void {
	cookies.set(LOCALE_COOKIE, locale, {
		path: '/',
		maxAge: 60 * 60 * 24 * 365,
		sameSite: 'lax',
	});
}

export function clearFunctionalCookies(cookies: AstroCookies): void {
	cookies.delete(LOCALE_COOKIE, { path: '/' });
}

export function getI18n(locale: Locale): {
	locale: Locale;
	m: Messages;
	pm: PrivacyMessages;
	em: ErrorMessages;
} {
	return { locale, m: getMessages(locale), pm: getPrivacyMessages(locale), em: getErrorMessages(locale) };
}

export { getMessages, interpolate, translateCategory } from './messages';
export { getPrivacyMessages } from './privacy-messages';
export { getErrorMessages } from './error-messages';
export { isLocale, LOCALES, LOCALE_COOKIE, type Locale } from './locales';
