import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@components': '/src/components',
			'@hooks': '/src/hooks',
      '@context': '/src/context',
			'@api': '/src/api',
      '@utils': '/src/utils',
		},
	},
});
