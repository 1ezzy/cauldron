import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, params }) => {
	const campaignId = params.campaignId as string;

	const campaign = await prisma.campaign.findUnique({
		where: {
			id: campaignId
		},
		include: {
			spells: {
				orderBy: {
					level: 'asc'
				}
			},
			classes: true
		}
	});

	if (!campaign) {
		return json({ message: `Campaign not found` }, { status: 404 });
	}

	return json(campaign);
};

export const DELETE: RequestHandler = async ({ url }) => {
	const ownerId = url.searchParams.get('owner_id') ?? '';
	const campaignId = url.searchParams.get('campaign_id') ?? '';

	const campaign = await prisma.campaign.delete({
		where: {
			owner_id: ownerId,
			id: campaignId
		}
	});

	if (!campaign) {
		return json({ message: `Could not find campaign` }, { status: 404 });
	}

	return json(campaign);
};
