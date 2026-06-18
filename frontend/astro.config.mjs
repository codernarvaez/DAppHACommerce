// @ts-check
import node from '@astrojs/node';
import { defineConfig } from 'astro/config';
import icon from "astro-icon";

const apiProxyTarget = process.env.API_BASE_URL ?? 'http://127.0.0.1:8000';

export default defineConfig({
	output: 'server',
	adapter: node({ mode: 'standalone' }),
	vite: {
		server: {
			proxy: {
				'/api': {
					target: apiProxyTarget,
					changeOrigin: true,
				},
			},
		},
	},
	integrations: [icon()],
});
