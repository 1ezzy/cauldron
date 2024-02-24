import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, locals, params }) => {
	const user = await locals.user;
	if (!user) redirect(307, '/login');

	const userId = user.id;

	const characterRes = await fetch(`/api/characters/${params.characterId}?user_id=${userId}`);

	const characterItem = await characterRes.json();

	return { characterItem, userId };
}) satisfies PageServerLoad;
