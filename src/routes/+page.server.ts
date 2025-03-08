import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const spellsRes = await fetch(`/api`);
	const spellsItem = await spellsRes.json();

	return { spellsItem };
};
