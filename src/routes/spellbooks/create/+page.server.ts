import { get, writable } from 'svelte/store';
import { CastingClassType } from '$lib/types/casting-class.type';
import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const userStore = writable('');

const createSpellbookSchema = z.object({
	name: z.string().max(50),
	characterName: z.string().max(50),
	description: z.string().max(500),
	class1: z.enum(CastingClassType),
	class2: z.optional(z.enum(CastingClassType)),
	class3: z.optional(z.enum(CastingClassType))
});

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(307, '/login');

	userStore.set(session.user.userId);

	const form = await superValidate(createSpellbookSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, createSpellbookSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const classes = [form.data.class1, form.data.class2, form.data.class3];

		const classesMapped = JSON.stringify(
			classes
				.filter((className) => className !== undefined)
				.map((className) => {
					return { index: className };
				})
		);

		const createRes = await fetch(
			`/api/spellbooks/create?
			user_id=${get(userStore)}&
			spellbook_name=${form.data.name}&
			character_name=${form.data.characterName}&
			spellbook_description=${form.data.description}&
			classes=${classesMapped}`,
			{
				method: 'POST'
			}
		);
		createRes.json();

		redirect(303, '/spellbooks');
	}
} satisfies Actions;
