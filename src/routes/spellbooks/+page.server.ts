import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const spellbooksRes = await fetch(`/api/spellbooks?user_id=${session.user.userId}`);

	const spellbooksItem = spellbooksRes.json();

	return { spellbooksItem };
}) satisfies PageServerLoad;
