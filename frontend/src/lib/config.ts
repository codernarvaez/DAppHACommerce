const DEFAULT_SERVER_API = 'http://127.0.0.1:8000';

export function getApiBaseUrl(): string {
	if (import.meta.env.SSR) {
		return (
			import.meta.env.API_BASE_URL ??
			import.meta.env.PUBLIC_API_BASE_URL ??
			DEFAULT_SERVER_API
		);
	}

	return import.meta.env.PUBLIC_API_BASE_URL ?? '';
}
