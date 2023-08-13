import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const spellbook = await prisma.spellbook.findUnique({
		where: {
			user_id: session.user.userId,
			index: params.spellbookName
		}
	});

	return { spellbook };
}) satisfies PageServerLoad;
