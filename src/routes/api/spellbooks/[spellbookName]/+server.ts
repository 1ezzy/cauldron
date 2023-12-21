import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, params }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const spellbookName = params.spellbookName as string;

	const spellbook = await prisma.spellbook.findUnique({
		where: {
			user_id: userId,
			index: spellbookName
		},
		include: {
			spells: true
		}
	});

	if (!spellbook) {
		return json({ message: `Spellbook not found` }, { status: 404 });
	}

	return json(spellbook);
};
