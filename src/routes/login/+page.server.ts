import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) redirect(307, '/');
	return {};
}) satisfies PageServerLoad;
