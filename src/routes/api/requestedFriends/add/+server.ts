import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const friendId = url.searchParams.get('friend_id') ?? '';

	const user = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});

	const friend = await prisma.user.findUnique({
		where: {
			id: friendId
		}
	});

	if (!friend || !user) {
		return json({ message: `Could not find user` }, { status: 404 });
	}

	let updateUserFriends;
	if (!user.friend_ids.includes(friendId)) {
		updateUserFriends = await prisma.requestedFriends.upsert({
			where: {
				user_id: friendId
			},
			create: {
				user_id: friendId,
				requested_friend_ids: [userId]
			},
			update: {
				requested_friend_ids: {
					push: userId
				}
			}
		});
		return json(updateUserFriends);
	} else {
		return json({ message: `You are already friends with ${friend.username}` }, { status: 404 });
	}
};