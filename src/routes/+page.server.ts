import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	const user = await locals.user;
	if (!user) redirect(302, '/login');

	const username = user.discordUsername;

	return { username };
}) satisfies PageServerLoad;
