import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, locals, params }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(307, '/login');

	const profileRes = await fetch(`/api/users/${params.userId}`);

	const profileItem = await profileRes.json();

	return { profileItem };
}) satisfies PageServerLoad;
