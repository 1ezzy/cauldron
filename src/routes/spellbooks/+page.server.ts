import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, locals }) => {
	const user = await locals.user;
	if (!user) redirect(302, '/login');

	const spellbooksRes = await fetch(`/api/spellbooks?user_id=${user.id}`);

	const spellbooksItem = await spellbooksRes.json();

	return { spellbooksItem };
}) satisfies PageServerLoad;
