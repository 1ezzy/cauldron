import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const friendId = url.searchParams.get('friend_id') ?? '';

	const userFriends = await prisma.friends.findUnique({
		where: {
			user_id: userId
		}
	});

	const friendFriends = await prisma.friends.findUnique({
		where: {
			user_id: friendId
		}
	});

	const friend = await prisma.user.findUnique({
		where: {
			id: friendId
		}
	});

	if (!friend || !userFriends) {
		return json({ message: `Could not find user` }, { status: 404 });
	}

	const updatedUserFriendsList = userFriends.friend_ids.filter((id: string) => id !== friendId);
	const updatedFriendFriendsList = friendFriends.friend_ids((id: string) => id !== userId);

	let updateUserFriends, updateFriendsFriends;
	if (userFriends.friend_ids.includes(friendId)) {
		updateUserFriends = await prisma.friends.update({
			where: {
				user_id: userId
			},
			data: {
				friend_ids: {
					set: updatedUserFriendsList
				}
			}
		});
		updateFriendsFriends = await prisma.friends.update({
			where: {
				user_id: friendId
			},
			data: {
				friend_ids: {
					set: updatedFriendFriendsList
				}
			}
		});
		return json({ updateUserFriends, updateFriendsFriends });
	} else {
		return json({ message: `${friend.username} isn't in your friends list` }, { status: 404 });
	}
};
