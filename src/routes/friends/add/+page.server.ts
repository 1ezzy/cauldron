import { get, writable } from 'svelte/store';
import { redirect, fail, json } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const userStore = writable('');

const addFriendSchema = z.object({
	username: z
		.string({ required_error: 'Name is required' })
		.min(1)
		.max(50, { message: 'Must be less than 50 characters' })
});

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(307, '/login');

	userStore.set(session.user.userId);

	const form = await superValidate(addFriendSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, addFriendSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const friend = await prisma.friends.update({
			where: {
				user_id: get(userStore)
			},
			data: {
				friends: {
					connect: {
						username: form.data.username
					}
				}
			}
		});

		if (!friend) {
			console.log('hit!');
			return json({ message: `Could not add friend` }, { status: 404 });
		}

		redirect(307, '/friends');
	}
} satisfies Actions;
