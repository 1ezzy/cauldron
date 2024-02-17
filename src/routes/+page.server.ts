import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(302, '/login');

	const username = session.user.discordUsername;

	return { username };
}) satisfies PageServerLoad;
