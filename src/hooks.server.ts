import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	const { cookies } = event;
	const sessionId = cookies.get('auth_session');

	if (sessionId) {
		event.locals.user = (await auth.getSession(sessionId)).user;
	}

	return await resolve(event);
}) satisfies Handle;
