import { LuciaError } from 'lucia';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';
import { Prisma } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/');
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');

		// TODO: Add better form validation here
		if (typeof username !== 'string' || username.length < 4 || username.length > 31) {
			return fail(400, {
				message: 'Invalid username'
			});
		}
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		try {
			const user = await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: username.toLowerCase(),
					password
				},
				attributes: {
					username
				}
			});
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (error) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError &&
				error.code === 'P2002' &&
				error.message?.includes('username')
			) {
				return fail(400, { message: 'Username already in use' });
			}

			if (error instanceof LuciaError && error.message === 'AUTH_DUPLICATE_KEY_ID') {
				return fail(400, { message: 'Username already in use' });
			}

			return fail(400, { message: 'Could not register user' });
		}
	}
} satisfies Actions;
