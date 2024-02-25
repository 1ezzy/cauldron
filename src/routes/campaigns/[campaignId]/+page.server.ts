import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, locals, params }) => {
	const user = await locals.user;
	if (!user) redirect(307, '/login');

	const userId = user.id;

	const campaignsRes = await fetch(`/api/campaigns/${params.campaignId}?user_id=${user.id}`);

	const campaignItem = await campaignsRes.json();

	return { campaignItem, userId };
}) satisfies PageServerLoad;
