import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('user_id') ?? '';
	const spellbooks = await prisma.spellbook.findMany({
		where: {
			user_id: userId
		}
	});

	if (!spellbooks) {
		return json({ message: `No spellbooks found` }, { status: 404 });
	}

	return json(spellbooks);
};
