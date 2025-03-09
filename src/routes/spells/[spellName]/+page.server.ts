import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const spellRes = await fetch(`/api/spells/${params.spellName}`);
	const spellItem = await spellRes.json();

	return { spellItem };
};
