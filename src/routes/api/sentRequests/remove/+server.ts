import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const sentRequestId = url.searchParams.get('sent_request_id') ?? '';

	const sentRequests = await prisma.sentRequests.findUnique({
		where: {
			user_id: sentRequestId
		}
	});

	if (!sentRequests) {
		return json({ message: `User has no sent friend requests` }, { status: 404 });
	}

	const updatedSentRequestIdList = sentRequests.sent_request_ids?.filter(
		(id: string) => id !== userId
	);

	let updatedUser, updatedSentRequests;
	if (sentRequests.sent_request_ids?.includes(userId)) {
		updatedUser = await prisma.user.update({
			where: {
				id: userId
			},
			data: {
				sent_request_ids: {
					set: updatedSentRequestIdList
				}
			}
		});

		updatedSentRequests = await prisma.sentRequests.update({
			where: {
				user_id: sentRequestId
			},
			data: {
				sent_request_ids: {
					set: updatedSentRequestIdList
				}
			}
		});
		return json({ updatedUser, updatedSentRequests });
	} else if (sentRequests.sent_request_ids === undefined) {
		return json({ message: 'User has no sent friend requests' }, { status: 400 });
	} else {
		return json({ message: 'You didnt send a request to this user' }, { status: 404 });
	}
};
