import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, locals }) => {
	const user = await locals.user;
	if (!user) redirect(307, '/login');

	const friendsRes = await fetch(`/api/friends?user_id=${user.id}`);
	const requestedFriendsRes = await fetch(`/api/requestedFriends?user_id=${user.id}`);

	const friendsItem = await friendsRes.json();
	const requestedFriendsItem = await requestedFriendsRes.json();

	return { friendsItem, requestedFriendsItem };
}) satisfies PageServerLoad;
