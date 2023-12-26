import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const index = url.searchParams.get('index') ?? '';
	const characterName = url.searchParams.get('character_name') ?? '';
	const playerName = url.searchParams.get('player_name') ?? '';
	const description = url.searchParams.get('description') ?? '';
	const level = url.searchParams.get('level') ?? '';

	if (!userId) {
		return json({ message: `Could not create spellbook` }, { status: 404 });
	}

	const character = await prisma.character.create({
		data: {
			user_id: userId,
			index: index,
			character_name: characterName,
			player_name: playerName,
			description: description,
			level: parseInt(level)
			// class_ids:
			// race_ids:
		}
	});

	if (!character) {
		return json({ message: `Could not create character` }, { status: 404 });
	}

	return json(character);
};
