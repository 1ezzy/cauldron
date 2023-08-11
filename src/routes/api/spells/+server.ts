import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const spells = await prisma.spell.findMany();

	if (!spells) {
		return new Response(JSON.stringify({ message: `No spells found` }), {
			status: 404
		});
	}

	return new Response(JSON.stringify(spells), { status: 200 });
};
