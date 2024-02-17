import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const userId = params.userId as string;
	const profile = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});

	if (!profile) {
		return json({ message: `No profile found for user` }, { status: 404 });
	}

	return json(profile);
};
