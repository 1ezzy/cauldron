import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, locals }) => {
	const user = await locals.user;
	if (!user) redirect(302, '/login');

	const userId = user.id;

	const spellsRes = await fetch(`/api/spells`);
	const spellbookRes = await fetch(`/api/spellbooks?user_id=${user.id}`);

	const spellsItem = await spellsRes.json();
	const spellbookItem = await spellbookRes.json();

	return { spellsItem, spellbookItem, userId };
}) satisfies PageServerLoad;
