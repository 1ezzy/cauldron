import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { theme } from './src/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			transitionProperty: {
				width: 'width'
			}
		}
	},
	plugins: [
		skeleton({
			themes: {
				custom: [theme]
			}
		}),
		forms
	]
} satisfies Config;
