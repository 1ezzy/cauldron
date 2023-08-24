import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { prisma as client } from '$lib/server/prisma';
import { prisma } from '@lucia-auth/adapter-prisma';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: prisma(client, {
		user: 'user',
		key: 'key',
		session: 'session'
	}),
	getUserAttributes: (data) => {
		return {
			username: data.username,
			created_at: data.created_at,
			updated_at: data.updated_at
		};
	}
});

export type Auth = typeof auth;
