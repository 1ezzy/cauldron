import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, locals }) => {
	const user = await locals.user;
	if (!user) redirect(307, '/login');

	const campaignsRes = await fetch(`/api/campaigns?user_id=${user.id}`);
	const campaignsItem = await campaignsRes.json();

	const campaignOwner = await fetch(`/api/users/${user.id}`);
	const ownerItem = await campaignOwner.json();
	const ownerUsername = ownerItem.username;

	return { campaignsItem, ownerItem, ownerUsername };
}) satisfies PageServerLoad;
