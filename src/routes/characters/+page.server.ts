import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, locals }) => {
	const user = await locals.user;
	if (!user) redirect(307, '/login');

	const charactersRes = await fetch(`/api/characters?user_id=${user.id}`);

	const charactersItem = await charactersRes.json();

	return { charactersItem };
}) satisfies PageServerLoad;
