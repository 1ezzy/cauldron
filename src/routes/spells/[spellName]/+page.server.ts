import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, params, locals }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(307, '/login');

	const spellRes = await fetch(`/api/spells/${params.spellName}`);
	const spellbookRes = await fetch(`/api/spellbooks?user_id=${session.user.userId}`);

	const spellItem = await spellRes.json();
	const spellbookItem = await spellbookRes.json();

	return { spellItem, spellbookItem, session };
}) satisfies PageServerLoad;
