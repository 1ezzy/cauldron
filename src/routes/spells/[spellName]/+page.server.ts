import { PUBLIC_DND5E_BASE_URL } from '$env/static/public';

import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, params, locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const res = await fetch(`${PUBLIC_DND5E_BASE_URL}/api/spells/${params.spellName}`);
	const item = await res.json();

	return { item };
}) satisfies PageServerLoad;
