import { Lucia } from 'lucia';
import { dev } from '$app/environment';

import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { prisma as client } from '$lib/server/prisma';

import { Discord } from 'arctic';
import {
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	DISCORD_REDIRECT_URI_DEV,
	DISCORD_REDIRECT_URI_PROD
} from '$env/static/private';
import type { ObjectId } from 'mongodb';

const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			discordId: attributes.discord_id,
			discordUsername: attributes.discord_username
		};
	}
});

export const discord = new Discord(
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	dev ? DISCORD_REDIRECT_URI_DEV : DISCORD_REDIRECT_URI_PROD
);

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			discord_id: number;
			discord_username: string;
		};
	}
}
