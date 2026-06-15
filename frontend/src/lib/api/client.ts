import { getApiBaseUrl } from '../config';

export class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
	}
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
	const base = getApiBaseUrl().replace(/\/$/, '');
	const url = `${base}${path}`;

	const response = await fetch(url, {
		...init,
		headers: {
			Accept: 'application/json',
			...init?.headers,
		},
	});

	if (!response.ok) {
		let detail = response.statusText;
		try {
			const body = (await response.json()) as { detail?: string };
			if (body.detail) detail = body.detail;
		} catch {
			// ignore parse errors
		}
		throw new ApiError(detail, response.status);
	}

	return (await response.json()) as T;
}

export async function checkApiHealth(): Promise<boolean> {
	try {
		const base = getApiBaseUrl().replace(/\/$/, '');
		const response = await fetch(`${base}/`, {
			headers: { Accept: 'application/json' },
		});
		return response.ok;
	} catch {
		return false;
	}
}
