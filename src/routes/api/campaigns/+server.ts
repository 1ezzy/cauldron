import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const campaigns = await prisma.campaign.findMany({
		where: {
			owner_id: userId
		},
		include: {
			owner_user: true,
			requested_users: true,
			users: true
		}
	});

	if (!campaigns) {
		return json({ message: `No campaigns found` }, { status: 404 });
	}

	return json(campaigns);
};
