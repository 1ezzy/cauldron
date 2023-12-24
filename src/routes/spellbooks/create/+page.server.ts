import { get, writable } from 'svelte/store';
import { CastingClassEnum } from '$lib/types/casting-class.enum';
import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { stringToIndex } from '$lib/utils/string-utils';

import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const userStore = writable('');

const createSpellbookSchema = z.object({
	name: z.string(),
	characterName: z.string(),
	description: z.string(),
	class1: z.nativeEnum(CastingClassEnum),
	class2: z.optional(z.nativeEnum(CastingClassEnum)),
	class3: z.optional(z.nativeEnum(CastingClassEnum))
});

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(307, '/login');

	userStore.set(session.user.userId);

	const form = await superValidate(createSpellbookSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, createSpellbookSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const classes: Array<CastingClassEnum> = [];
		[form.data.class1, form.data.class2, form.data.class3].forEach((item) => {
			if (item !== undefined) {
				classes.push(item);
			}
		});

		try {
			await prisma.spellbook.create({
				data: {
					index: stringToIndex(form.data.name),
					spellbook_name: form.data.name,
					character_name: form.data.characterName,
					spellbook_description: form.data.description,
					class: classes,
					user_id: get(userStore)
				}
			});
		} catch (error) {
			console.log(error);
		}

		redirect(303, '/spellbooks');
	}
} satisfies Actions;
