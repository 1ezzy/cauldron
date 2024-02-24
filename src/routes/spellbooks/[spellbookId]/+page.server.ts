import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, locals, params }) => {
	const user = await locals.user;
	if (!user) redirect(302, '/login');

	const userId = user.id;

	const spellbookRes = await fetch(`/api/spellbooks/${params.spellbookId}?user_id=${user.id}`);

	const spellbookItem = await spellbookRes.json();

	return { spellbookItem, userId };
}) satisfies PageServerLoad;
