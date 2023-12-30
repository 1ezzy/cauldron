import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id');
	const characterName = url.searchParams.get('character_name');
	const playerName = url.searchParams.get('player_name');
	const description = url.searchParams.get('description');
	const race = url.searchParams.get('race');

	const level = parseInt(url.searchParams.get('level') ?? '1');
	const experience = parseInt(url.searchParams.get('experience') ?? '0');
	const classNames = JSON.parse(url.searchParams.get('classes') ?? '[]');

	if (
		!userId ||
		!characterName ||
		!playerName ||
		!description ||
		!level ||
		!experience ||
		!classNames ||
		!race
	) {
		return json({ message: `Could not create character` }, { status: 404 });
	}

	const character = await prisma.character.create({
		data: {
			character_name: characterName,
			player_name: playerName,
			description: description,
			level: level,
			classes: { connect: classNames },
			race: { connect: { index: race } },
			auth_user: { connect: { id: userId } }
		},
		include: {
			classes: true,
			race: true
		}
	});

	if (!character) {
		return json({ message: `Could not create character` }, { status: 404 });
	}

	return json(character);
};
