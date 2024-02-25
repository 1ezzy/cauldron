import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const spellbookName = url.searchParams.get('spellbook_name') ?? '';
	const spellbookDescription = url.searchParams.get('spellbook_description') ?? null;
	const characterName = url.searchParams.get('character_name') ?? '';
	const classes = JSON.parse(url.searchParams.get('classes') ?? '') ?? '';

	if (!userId) {
		return json({ message: `Could not create spellbook` }, { status: 404 });
	}

	const spellbook = await prisma.spellbook.create({
		data: {
			user_id: userId,
			spellbook_name: spellbookName,
			spellbook_description: spellbookDescription,
			character_name: characterName,
			classes: {
				connect: classes
			}
		},
		include: {
			classes: true
		}
	});

	if (!spellbook) {
		return json({ message: `Could not create spellbook` }, { status: 404 });
	}

	return json(spellbook);
};
