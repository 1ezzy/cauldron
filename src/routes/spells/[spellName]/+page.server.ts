import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, params, locals }) => {
	const user = await locals.user;
	if (!user) redirect(302, '/login');

	const userId = user.id;

	const spellRes = await fetch(`/api/spells/${params.spellName}`);
	const spellbookRes = await fetch(`/api/spellbooks?user_id=${user.id}`);

	const spellItem = await spellRes.json();
	const spellbookItem = await spellbookRes.json();

	return { spellItem, spellbookItem, userId };
}) satisfies PageServerLoad;
