import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, locals }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(302, '/login');

	const profileRes = await fetch(`/api/profile?user_id=${session.user.userId}`);

	const profileItem = await profileRes.json();

	return { profileItem };
}) satisfies PageServerLoad;
