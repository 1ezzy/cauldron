import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, locals }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(307, '/login');

	const spellsRes = await fetch(`/api/spells`);
	const spellbookRes = await fetch(`/api/spellbooks?user_id=${session.user.userId}`);

	const spellsItem = await spellsRes.json();
	const spellbookItem = await spellbookRes.json();

	return { spellsItem, spellbookItem, session };
}) satisfies PageServerLoad;
