import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, locals }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(307, '/login');

	const spellbooksRes = await fetch(`/api/spellbooks?user_id=${session.user.userId}`);

	const spellbooksItem = await spellbooksRes.json();

	return { spellbooksItem };
}) satisfies PageServerLoad;
