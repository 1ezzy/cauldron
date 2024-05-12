import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const userId = params.userId;
	const profile = await prisma.user.findUnique({
		where: {
			id: userId
		},
		include: {
			requested_campaigns: {
				include: {
					owner_user: true
				}
			},
			joined_campaigns: {
				include: {
					owner_user: true
				}
			},
			owned_campaigns: true
		}
	});

	if (!profile) {
		return json({ message: `No profile found for user` }, { status: 404 });
	}

	return json(profile);
};
