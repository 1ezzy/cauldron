import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, params }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const characterId = params.characterId as string;

	const character = await prisma.character.findUnique({
		where: {
			user_character: { id: characterId, user_id: userId }
		},
		include: {
			classes: true,
			race: true
		}
	});

	if (!character) {
		return json({ message: `Character not found` }, { status: 404 });
	}

	return json(character);
};
