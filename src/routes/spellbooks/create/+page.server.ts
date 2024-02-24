import { get, writable } from 'svelte/store';
import { CastingClassType } from '$lib/types/casting-class.type';
import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const userStore = writable('');

const createSpellbookSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(1)
		.max(50, { message: 'Must be less than 50 characters' }),
	characterName: z
		.string({ required_error: 'Character name is required' })
		.min(1)
		.max(50, { message: 'Must be less than 50 characters' }),
	description: z.string().max(500, { message: 'Must be less than 500 characters' }),
	classes: z.array(z.enum(CastingClassType)).nonempty({ message: 'Select at least one class' })
});

export const load = (async ({ locals }) => {
	const user = await locals.user;
	if (!user) redirect(302, '/login');

	userStore.set(user.id);

	const form = await superValidate(createSpellbookSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, createSpellbookSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const classesMapped = JSON.stringify(
			form.data.classes
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
