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
	} else if (!campaign) {
		return json({ message: `Could not find campaign` }, { status: 404 });
	}

	let updateUserCampaigns, updateCampaignRequestedUsers;
	if (user.joined_campaign_ids.includes(campaignId)) {
		return json({ message: `Already in campaign ${campaign.campaign_name}` }, { status: 404 });
	} else {
		const updatedRequestedCampaigns = user.requested_campaign_ids?.filter(
			(id: string) => id !== campaignId
		);
		const updatedRequestedUsers = campaign.requested_user_ids.filter((id: string) => id !== userId);

		updateUserCampaigns = await prisma.user.update({
			where: {
				id: userId
			},
			data: {
				joined_campaign_ids: {
					push: campaignId
				},
				requested_campaigns: {
					set: updatedRequestedCampaigns
				},
				joined_campaigns: {
					connect: {
						id: campaignId
					}
				}
			}
		});

		updateCampaignRequestedUsers = await prisma.campaign.update({
			where: {
				id: campaignId
			},
			data: {
				user_ids: {
					push: userId
				},
				requested_user_ids: {
					set: updatedRequestedUsers
				}
			}
		});
		json(updateCampaignRequestedUsers);
		return json(updateUserCampaigns);
	}
};
