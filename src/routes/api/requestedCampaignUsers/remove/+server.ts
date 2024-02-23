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

	const updatedRequestedUserIdList = campaign.requested_user_ids?.filter(
		(id: string) => id !== userId
	);

	let updatedCampaign, updatedUser;
	if (campaign.requested_user_ids === undefined) {
		return json({ message: `${campaign.campaign_name} has no requested users` }, { status: 400 });
	} else if (campaign.requested_user_ids?.includes(userId)) {
		updatedCampaign = await prisma.campaign.update({
			where: {
				id: userId
			},
			data: {
				requested_user_ids: {
					set: updatedRequestedUserIdList
				}
			}
		});

		updatedUser = await prisma.user.update({
			where: {
				id: userId
			},
			data: {
				requested_user_ids: {
					set: updatedRequestedUserIdList
				}
			}
		});
		return json({ updatedUser, updatedCampaign });
	} else {
		return json(
			{ message: `${user.username} has not been requested to join ${campaign.campaign_name}` },
			{ status: 404 }
		);
	}
};
