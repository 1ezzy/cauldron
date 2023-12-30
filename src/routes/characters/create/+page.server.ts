import { get, writable } from 'svelte/store';
import { redirect, fail } from '@sveltejs/kit';
import { RaceType } from '$lib/types/race.type';
import { ClassType } from '$lib/types/class.type';
import type { Actions, PageServerLoad } from './$types';

import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const userStore = writable('');

const createCharacterSchema = z.object({
	characterName: z.string().max(50),
	playerName: z.string().max(50),
	description: z.string().max(200),
	level: z.number().lte(20).default(1),
	experience: z.number().gte(0).default(0),
	classes: z.array(z.enum(ClassType)),
	race: z.enum(RaceType).default(RaceType[0])
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

		const classesMapped = JSON.stringify(
			form.data.classes.map((className) => {
				return { index: className };
			})
		);

		console.log(classesMapped);

		const createRes = await fetch(
			`/api/characters/create?
			user_id=${get(userStore)}&
			character_name=${form.data.characterName}&
			player_name=${form.data.playerName}&
			description=${form.data.description}&
			level=${form.data.level}&
			experience=${form.data.experience}&
			classes=${classesMapped}&
			race=${form.data.race}`,
			{
				method: 'POST'
			}
		);
		createRes.json();
	}
} satisfies Actions;
