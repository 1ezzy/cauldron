import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const friends = await prisma.friends.findUnique({
		where: {
			user_id: userId
		},
		include: {
			friends: true
		}
	});

	if (!friends) {
		return json({ message: `No friends found` }, { status: 404 });
	}

	return json(friends);
};
