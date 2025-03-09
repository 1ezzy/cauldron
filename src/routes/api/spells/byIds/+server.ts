import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { spellIds } = await request.json();
	console.log(spellIds);

	if (!spellIds || !Array.isArray(spellIds) || spellIds.length === 0) {
		return json({ error: 'Invalid spell IDs' }, { status: 400 });
	}

	const spells = await prisma.spell.findMany({
		where: {
			id: {
				in: spellIds
			}
		}
	});

	console.log(spells);

	if (!spells) {
		return json({ message: 'Spells not found' }, { status: 404 });
	}
	return json(spells);
};
