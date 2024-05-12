import type { Prisma } from '@prisma/client';

export type UserWithRequestedCampaigns = Prisma.UserGetPayload<{
	include: {
		requested_campaigns: {
			include: {
				owner_user: true;
				users: true;
				requested_users: true;
			};
		};
		joined_campaigns: {
			include: {
				owner_user: true;
				users: true;
				requested_users: true;
			};
		};
	};
}>;
