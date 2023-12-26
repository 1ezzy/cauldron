import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, locals }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(307, '/login');

	const charactersRes = await fetch(`/api/characters?user_id=${session.user.userId}`);

	const charactersItem = await charactersRes.json();

	return { charactersItem };
}) satisfies PageServerLoad;
