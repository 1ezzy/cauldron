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

	const updatedRequestedFriendsIdList = requestedFriends.requested_friend_ids?.filter(
		(id: string) => id !== requestedFriendId
	);

	let updatedUser, updatedRequestedFriends;
	if (requestedFriends.requested_friend_ids === undefined) {
		return json({ message: 'User has no requested friends' }, { status: 400 });
	} else if (requestedFriends.requested_friend_ids?.includes(requestedFriendId)) {
		updatedUser = await prisma.user.update({
			where: {
				id: userId
			},
			data: {
				requested_friend_ids: {
					set: updatedRequestedFriendsIdList
				}
			}
		});

		updatedRequestedFriends = await prisma.requestedFriends.update({
			where: {
				user_id: userId
			},
			data: {
				requested_friend_ids: {
					set: updatedRequestedFriendsIdList
				}
			}
		});
		return json({ updatedUser, updatedRequestedFriends });
	} else {
		return json({ message: 'Friend not in list of requests' }, { status: 404 });
	}
};
