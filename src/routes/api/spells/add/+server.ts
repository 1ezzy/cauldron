import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const spellbookId = url.searchParams.get('spellbook_id') ?? '';
	const spellId = url.searchParams.get('spell_id') ?? '';

	const spellbook = await prisma.spellbook.findUnique({
		where: {
			user_id: userId,
			id: spellbookId
		}
	});

	if (!spellbook) {
		return json({ message: `Could not find spellbook` }, { status: 404 });
	}

	let updateSpellbook;
	if (!spellbook.spell_ids.includes(spellId)) {
		updateSpellbook = await prisma.spellbook.update({
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
		return json(updateSpellbook);
	} else {
		return json({ message: `Spell already in ${spellbook.spellbook_name}` }, { status: 404 });
	}
};
