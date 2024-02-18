import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const campaignName = url.searchParams.get('campaign_name') ?? '';
	const campaignDescription = url.searchParams.get('campaign_description') ?? '';
	const campaignUsers = JSON.parse(url.searchParams.get('campaign_users') ?? '') ?? '';

	if (!userId) {
		return json({ message: `Could not create campaign` }, { status: 404 });
	}

	const campaign = await prisma.campaign.create({
		data: {
			owner_id: userId,
			campaign_name: campaignName,
			capaign_description: campaignDescription,
			users: {
				connect: campaignUsers
			}
		},
		include: {
			users: true
		}
	});

	if (!campaign) {
		return json({ message: `Could not create campaign` }, { status: 404 });
	}

	return json(campaign);
};
