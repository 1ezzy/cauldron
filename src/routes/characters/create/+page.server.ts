import { get, writable } from 'svelte/store';
import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { stringToIndex } from '$lib/utils/string-utils';

import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const userStore = writable('');

const createCharacterSchema = z.object({
	characterName: z.string(),
	playerName: z.string(),
	description: z.string()
	// class1: z.nativeEnum(CastingClassEnum),
	// class2: z.optional(z.nativeEnum(CastingClassEnum)),
	// class3: z.optional(z.nativeEnum(CastingClassEnum))
});

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(307, '/login');

	userStore.set(session.user.userId);

	const form = await superValidate(createCharacterSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, createCharacterSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const createRes = await fetch(
			`/api/spellbooks/create?
			user_id=${get(userStore)}&
			character_name=${form.data.characterName}&
			player_name=${form.data.playerName}&
			description=${form.data.description}`,
			{
				method: 'POST'
			}
		);
		createRes.json();

		redirect(303, '/characters');
	}
} satisfies Actions;
