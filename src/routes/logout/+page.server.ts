import type { Actions } from './$types';
import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ locals, cookies }) => {
		const user = await locals.user;
		const session = await locals.session;
		if (!user) return fail(401);

		if (session) {
			await lucia.invalidateSession(session.id);
			const sessionCookie = lucia.createBlankSessionCookie();

			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
			redirect(302, '/login');
		} else {
			return fail(401);
		}
	}
} satisfies Actions;
