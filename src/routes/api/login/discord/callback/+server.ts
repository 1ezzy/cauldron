import { OAuth2RequestError } from 'arctic';
import { discord, lucia } from '$lib/server/auth';

import type { RequestEvent } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { generateId } from 'lucia';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('discord_oauth_state') ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await discord.validateAuthorizationCode(code);
		const discordUserResponse = await fetch('https://discord.com/api/users/@me', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const discordUser: DiscordUser = await discordUserResponse.json();

		const existingUser = await prisma.user.findUnique({
			where: {
				username: discordUser.username
			}
		});

		if (existingUser) {
			const expiresAt = new Date();
			expiresAt.setDate(expiresAt.getDate() + 30);

			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} else {
			const user = await prisma.user.create({
				data: {
					username: discordUser.username,
					discord_id: parseInt(discordUser.id),
					discord_username: discordUser.username
				}
			});

			const session = await lucia.createSession(user.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

interface DiscordUser {
	id: string;
	username: string;
}
