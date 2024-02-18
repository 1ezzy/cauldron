import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const requestedFriendId = url.searchParams.get('requested_friend_id') ?? '';

	const requestedFriends = await prisma.requestedFriends.findUnique({
		where: {
			user_id: userId
		}
	});

	if (!requestedFriends) {
		return json({ message: `User has no requested friends` }, { status: 404 });
	}

	const updatedRequestedFriendsIdList = requestedFriends.sent_request_ids.filter(
		(id: string) => id !== requestedFriendId
	);

	let updatedRequestedFriends;
	if (requestedFriends.sent_request_ids.includes(requestedFriendId)) {
		updatedRequestedFriends = await prisma.requestedFriends.update({
			where: {
				user_id: userId
			},
			data: {
				sent_requests_ids: {
					set: updatedRequestedFriendsIdList
				}
			}
		});
		return json(updatedRequestedFriends);
	} else {
		return json({ message: 'You didnt send a request to this user' }, { status: 404 });
	}
};
