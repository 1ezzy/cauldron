import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, locals }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(307, '/login');

	const campaignsRes = await fetch(`/api/campaigns?user_id=${session.user.userId}`);
	const campaignsItem = await campaignsRes.json();

	const campaignOwner = await fetch(`/api/users/${campaignsItem.owner_id}`);
	const ownerItem = await campaignOwner.json();
	const ownerUsername = ownerItem.username;

	return { campaignsItem, ownerUsername };
}) satisfies PageServerLoad;
