import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const spells = await prisma.spell.findMany();

	if (!spells) {
		return json({ message: `No spells found`, status: 404 });
	}

	return json(spells);
};
