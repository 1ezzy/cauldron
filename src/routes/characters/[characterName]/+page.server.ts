import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, locals, params }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(307, '/login');

	const userId = session.user.userId;

	const characterRes = await fetch(
		`/api/characters/${params.characterName}?user_id=${session.user.userId}`
	);

	const characterItem = await characterRes.json();

	return { characterItem, userId };
}) satisfies PageServerLoad;
