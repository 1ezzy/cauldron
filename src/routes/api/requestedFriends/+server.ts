import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const requestedFriend = await prisma.requestedFriends.findUnique({
		where: {
			user_id: userId
		}
	});

	if (!requestedFriend) {
		return json({ message: `No requested friends found` }, { status: 404 });
	}

	return json(requestedFriend);
};
