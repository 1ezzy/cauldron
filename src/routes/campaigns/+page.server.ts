import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Campaign } from '@prisma/client';

export const load = (async ({ fetch, locals }) => {
	const user = await locals.user;
	if (!user) redirect(307, '/login');

	const campaignsRes = await fetch(`/api/campaigns?user_id=${user.id}`);
	const campaignsItem = await campaignsRes.json();

	const foo = campaignsItem.filter((campaign: Campaign) => {
		campaign.owner_id === user.id;
	});

	const campaignOwner = await fetch(`/api/users/${user.id}`);
	const ownerItem = await campaignOwner.json();
	const ownerUsername = ownerItem.username;

	return { campaignsItem, ownerUsername };
}) satisfies PageServerLoad;
