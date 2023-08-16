import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const spellbookId = url.searchParams.get('spellbook_id') ?? '';
	const spellId = url.searchParams.get('spell_id') ?? '';

	const updateSpellbook = await prisma.spellbook.update({
		where: {
			user_id: userId,
			id: spellbookId
		},
		data: {
			spell_ids: {
				push: spellId
			},
			spells: {
				connect: [{ id: spellId }]
			}
		}
	});

	if (!updateSpellbook) {
		return json({ message: `Failed to update spellbook`, status: 404 });
	}

	return json(updateSpellbook);
};
