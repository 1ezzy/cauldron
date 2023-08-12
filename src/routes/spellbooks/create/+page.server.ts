import { ClassEnum } from '@prisma/client';
import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { stringToIndex } from '$lib/utils/string-utils';

const createSpellbookSchema = z.object({
	name: z.string(),
	characterName: z.string(),
	description: z.string(),
	class1: z.nativeEnum(ClassEnum),
	class2: z.optional(z.nativeEnum(ClassEnum)),
	class3: z.optional(z.nativeEnum(ClassEnum))
});

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const form = await superValidate(createSpellbookSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, createSpellbookSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const classes: Array<ClassEnum> = [];
		[form.data.class1, form.data.class2, form.data.class3].forEach((item) => {
			if (item !== undefined) {
				classes.push(item);
			}
		});

		// const spellbook = await prisma.spellbook.create({
		// 	data: {
		// 		index: stringToIndex(form.data.name),
		// 		spellbook_name: form.data.name,
		// 		character_name: form.data.characterName,
		// 		class: classes,
		// 		auth_user: user
		// 	}
		// });

		return { form };
	}
} satisfies Actions;
