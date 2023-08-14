import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, locals, params }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const spellbookRes = await fetch(
		`/api/spellbooks/${params.spellbookName}?user_id=${session.user.userId}`
	);

	const spellbookItem = await spellbookRes.json();

	console.log(spellbookItem.data);

	return { spellbookItem };
}) satisfies PageServerLoad;
