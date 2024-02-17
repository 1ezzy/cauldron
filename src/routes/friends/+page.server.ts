import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, locals }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(307, '/login');

	const friendsRes = await fetch(`/api/friends?user_id=${session.user.userId}`);
	const requestedFriendsRes = await fetch(`/api/requestedFriends?user_id=${session.user.userId}`);

	const friendsItem = await friendsRes.json();
	const requestedFriendsItem = await requestedFriendsRes.json();

	return { friendsItem, requestedFriendsItem };
}) satisfies PageServerLoad;
