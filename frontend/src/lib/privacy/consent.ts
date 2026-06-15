export const CONSENT_COOKIE = 'origin_consent';
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

export interface CookieConsentState {
	version: typeof CONSENT_VERSION;
	essential: true;
	functional: boolean;
	analytics: boolean;
	marketing: boolean;
	updatedAt: string;
}

export type CookieCategory = 'functional' | 'analytics' | 'marketing';

export function parseConsentCookie(raw: string | undefined): CookieConsentState | null {
	if (!raw) return null;

	try {
		const parsed = JSON.parse(decodeURIComponent(raw)) as CookieConsentState;
		if (parsed.version !== CONSENT_VERSION || parsed.essential !== true) return null;
		return parsed;
	} catch {
		return null;
	}
}

export function serializeConsent(state: CookieConsentState): string {
	return encodeURIComponent(JSON.stringify(state));
}

export function hasConsentDecision(state: CookieConsentState | null): boolean {
	return state !== null;
}

export function allowsCategory(
	state: CookieConsentState | null,
	category: CookieCategory,
): boolean {
	if (!state) return false;
	return state[category];
}

export function buildConsent(partial: Pick<CookieConsentState, 'functional' | 'analytics' | 'marketing'>): CookieConsentState {
	return {
		version: CONSENT_VERSION,
		essential: true,
		functional: partial.functional,
		analytics: partial.analytics,
		marketing: partial.marketing,
		updatedAt: new Date().toISOString(),
	};
}

export const PRESET_ALL: CookieConsentState = buildConsent({
	functional: true,
	analytics: true,
	marketing: true,
});

export const PRESET_ESSENTIAL: CookieConsentState = buildConsent({
	functional: false,
	analytics: false,
	marketing: false,
});
