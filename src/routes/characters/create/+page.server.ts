import { get, writable } from 'svelte/store';
import { redirect, fail, json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { RaceType } from '$lib/types/race.type';
import { ClassType } from '$lib/types/class.type';
import { AbilityScoreType } from '$lib/types/ability-score.type';
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
	race: z.enum(RaceType).default(RaceType[0]),
	scoresOriginal: z.array(
		z.object({
			type: z.enum(AbilityScoreType),
			value: z.number().lte(20)
		})
	)
});

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(307, '/login');

	userStore.set(session.user.userId);

	const form = await superValidate(createCharacterSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, createCharacterSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const classesMapped = form.data.classes.map((className) => {
			return { index: className };
		});

		const character = await prisma.character.create({
			data: {
				character_name: form.data.characterName,
				player_name: form.data.playerName,
				description: form.data.description,
				level: form.data.level,
				experience: form.data.experience,
				classes: { connect: classesMapped },
				race: { connect: { index: form.data.race } },
				auth_user: { connect: { id: get(userStore) } },
				scores_original: form.data.scoresOriginal,
				scores_current: form.data.scoresOriginal
			},
			include: {
				classes: true,
				race: true
			}
		});

		if (!character) {
			return json({ message: `Could not create character` }, { status: 404 });
		}

		redirect(307, '/characters');
	}
} satisfies Actions;
