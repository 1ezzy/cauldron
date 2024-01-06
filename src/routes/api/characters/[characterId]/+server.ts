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

export const DELETE: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const characterId = url.searchParams.get('character_id') ?? '';

	const character = await prisma.character.delete({
		where: {
			user_id: userId,
			id: characterId
		}
	});

	if (!character) {
		return json({ message: `Could not find character` }, { status: 404 });
	}

	return json(character);
};
