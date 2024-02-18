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

	let updateUser;
	if (user.friend_ids.includes(friendId)) {
		return json({ message: `Already friends with  ${friend.username}` }, { status: 404 });
	} else if (!user.requested_friend_ids.includes(friendId)) {
		updateUser = await prisma.user.update({
			where: {
				id: userId
			},
			data: {
				requested_friend_ids: {
					push: friendId
				},
				requested_friends: {
					connectOrCreate: {
						create: {
							user_id: friendId
						},
						where: {
							user_id: friendId
						}
					}
				}
			}
		});
		return json(updateUser);
	} else {
		return json(
			{ message: `A request has already been sent to ${friend.username}` },
			{ status: 404 }
		);
	}
};
