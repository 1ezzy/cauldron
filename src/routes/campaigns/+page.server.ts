import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, locals }) => {
	const user = await locals.user;
	if (!user) redirect(307, '/login');

	const campaignsRes = await fetch(`/api/campaigns?user_id=${user.id}`);
	const campaignsItem = await campaignsRes.json();

	const requestedCampaignsRes = await fetch(`api/requestedCampaigns?user_id=${user.id}`);
	const requestedCampaignsItem = await requestedCampaignsRes.json();

	const campaignOwner = await fetch(`/api/users/${user.id}`);
	const ownerItem = await campaignOwner.json();

	return { campaignsItem, requestedCampaignsItem, ownerItem };
}) satisfies PageServerLoad;
