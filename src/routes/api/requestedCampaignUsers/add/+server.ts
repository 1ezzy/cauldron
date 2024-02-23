import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const campaignId = url.searchParams.get('campaign_id') ?? '';

	const user = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});

	const campaign = await prisma.campaign.findUnique({
		where: {
			id: campaignId
		}
	});

	if (!user) {
		return json({ message: `Could not find user` }, { status: 404 });
	}

	if (!campaign) {
		return json({ message: `Could not find campaign` }, { status: 404 });
	}

	let updateCampaign;
	if (user.joined_campaign_ids.includes(userId)) {
		return json(
			{ message: `${user.username} has already been invited to ${campaign.campaign_name}` },
			{ status: 404 }
		);
	} else if (!campaign.requested_user_ids.includes(userId)) {
		updateCampaign = await prisma.campaign.update({
			where: {
				id: campaignId
			},
			data: {
				requested_user_ids: {
					push: userId
				},
				requested_users: {
					connect: {
						id: userId
					}
				}
			}
		});
		return json(updateCampaign);
	} else {
		return json(
			{
				message: `A request to join ${campaign.campaign_name} has already been sent to ${user.username}`
			},
			{ status: 404 }
		);
	}
};
