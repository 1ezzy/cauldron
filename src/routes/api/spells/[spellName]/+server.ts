import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const spellName = params.spellName as string;
	const spell = await prisma.spell.findFirst({
		where: {
			index: spellName
		}
	});

	if (!spell) {
		return json({ message: `Spell '${spellName}' not found`, status: 404 });
	}

	return json(spell);
};
