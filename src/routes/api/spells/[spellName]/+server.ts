import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const spellName = params.spellName as string;
	const spell = await prisma.spell.findFirst({
		where: {
			index: {
				equals: spellName
			}
		}
	});

	if (!spell) {
		return new Response(JSON.stringify({ message: `Spell '${spellName}' not found` }), {
			status: 404
		});
	}

	return new Response(JSON.stringify(spell), { status: 200 });
};
