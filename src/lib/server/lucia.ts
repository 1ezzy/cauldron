import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';

import { prisma as client } from '$lib/server/prisma';
import { prisma } from '@lucia-auth/adapter-prisma';

import { discord } from '@lucia-auth/oauth/providers';
import {
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	DISCORD_REDIRECT_URI_DEV,
	DISCORD_REDIRECT_URI_PROD
} from '$env/static/private';

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
			discordUsername: data.discordUsername,
			created_at: data.created_at,
			updated_at: data.updated_at
		};
	}
});

export const discordAuth = discord(auth, {
	clientId: DISCORD_CLIENT_ID,
	clientSecret: DISCORD_CLIENT_SECRET,
	redirectUri: dev ? DISCORD_REDIRECT_URI_DEV : DISCORD_REDIRECT_URI_PROD
});

export type Auth = typeof auth;
