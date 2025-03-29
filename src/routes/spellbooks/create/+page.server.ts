import type { Spell } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const spellsRes = await fetch(`/api/spells`);
	const spellsItem: Spell[] = await spellsRes.json();

	return { spellsItem };
};
