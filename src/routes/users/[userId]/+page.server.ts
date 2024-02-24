import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, locals, params }) => {
	const user = await locals.user;
	if (!user) redirect(302, '/login');

	const profileRes = await fetch(`/api/users/${params.userId}`);

	const profileItem = await profileRes.json();

	return { profileItem, user };
}) satisfies PageServerLoad;
