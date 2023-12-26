import { prisma } from '$lib/server/prisma';
import type { Class } from '@prisma/client';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const index = url.searchParams.get('index') ?? '';
	const spellbookName = url.searchParams.get('spellbook_name') ?? '';
	const spellbookDescription = url.searchParams.get('spellbook_description') ?? '';
	const characterName = url.searchParams.get('character_name') ?? '';
	const classes = url.searchParams.get('classes') ?? '';

	if (!userId) {
		return json({ message: `Could not create spellbook` }, { status: 404 });
	}

	const getClasses = async () => {
		let classesMapped = [];

		const classesPromises = JSON.parse(classes).map(async (className) => {
			const classRes = await fetch(`/api/classes/${className}`);
			return await classRes.json();
		});

		classesMapped = await Promise.all(classesPromises);
		return classesMapped;
	};

	const classesInfo: Class[] = await getClasses();

	const spellbook = await prisma.spellbook.create({
		data: {
			user_id: userId,
			index: index,
			spellbook_name: spellbookName,
			spellbook_description: spellbookDescription,
			character_name: characterName,
			classes: classesInfo
		}
	});

	if (!spellbook) {
		return json({ message: `Could not create spellbook` }, { status: 404 });
	}

	return json(spellbook);
};
