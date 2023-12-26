import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const characters = await prisma.character.findMany({
		where: {
			user_id: userId
		},
		include: {
			classes: true,
			races: true
		}
	});

	if (!characters) {
		return json({ message: `No characters found` }, { status: 404 });
	}

	return json(characters);
};
