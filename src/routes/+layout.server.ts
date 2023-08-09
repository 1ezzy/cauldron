import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();

	// DO NOT DO THIS
	return { session };
}) satisfies LayoutServerLoad;
