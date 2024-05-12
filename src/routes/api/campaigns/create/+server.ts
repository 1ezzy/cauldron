import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url }) => {
	const ownerId = url.searchParams.get('owner_id') ?? '';
	const campaignName = url.searchParams.get('campaign_name') ?? '';
	const campaignDescription = url.searchParams.get('campaign_description') ?? null;
	const campaignUsers = JSON.parse(url.searchParams.get('campaign_users') ?? '') ?? '';

	if (!ownerId) {
		return json({ message: `Could not create campaign` }, { status: 404 });
	}

	const campaign = await prisma.campaign.create({
		data: {
			owner_id: ownerId,
			user_ids: {
				set: [ownerId]
			},
			campaign_name: campaignName,
			campaign_description: campaignDescription,
			requested_users: {
				connect: campaignUsers.map((user: any) => ({ id: user.id }))
			}
		},
		include: {
			requested_users: true
		}
	});

	if (!campaign) {
		return json({ message: `Could not create campaign` }, { status: 404 });
	}

	return json(campaign);
};
