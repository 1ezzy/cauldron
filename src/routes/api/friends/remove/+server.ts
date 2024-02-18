import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const friendId = url.searchParams.get('friend_id') ?? '';

	const friends = await prisma.friends.findUnique({
		where: {
			user_id: userId
		}
	});

	if (!friends) {
		return json({ message: `User has no friends` }, { status: 404 });
	}

	const updatedFriendsList = friends.friend_ids.filter((id: string) => id !== friendId);

	let updateUserFriends, updateFriendsFriends;
	if (friends.friend_ids?.includes(friendId)) {
		updateUserFriends = await prisma.user.update({
			where: {
				id: userId
			},
			data: {
				friend_ids: {
					set: updatedFriendsList
				}
			}
		});
		updateFriendsFriends = await prisma.friends.update({
			where: {
				user_id: userId
			},
			data: {
				friend_ids: {
					set: updatedFriendsList
				}
			}
		});
		return json({ updateUserFriends, updateFriendsFriends });
	} else if (friends.friend_ids === undefined) {
		return json({ message: 'User has no friends' }, { status: 400 });
	} else {
		return json({ message: `Friend isn't in your friends list` }, { status: 404 });
	}
};
