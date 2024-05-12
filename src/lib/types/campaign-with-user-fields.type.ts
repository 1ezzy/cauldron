import { Prisma } from '@prisma/client';

export type CampaignWithUserFields = Prisma.CampaignGetPayload<{
	include: {
		owner_user: true;
		users: true;
		requested_users: true;
	};
}>;
