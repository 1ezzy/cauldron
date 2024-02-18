import { get, writable } from 'svelte/store';
import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const userStore = writable('');

const createCampaignSchema = z.object({
	name: z
		.string({ required_error: 'Campaign name is required' })
		.min(1)
		.max(50, { message: 'Must be less than 50 characters' }),
	description: z.string().max(500, { message: 'Must be less than 500 characters' }),
	users: z.array(z.string())
});

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(307, '/login');

	userStore.set(session.user.userId);

	const form = await superValidate(createCampaignSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, createCampaignSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const createRes = await fetch(
			`/api/spellbooks/create?
			user_id=${get(userStore)}&
			campaign_name=${form.data.name}&
			spellbook_description=${form.data.description}&
			classes=${JSON.stringify(form.data.users)}`,
			{
				method: 'POST'
			}
		);
		createRes.json();

		redirect(303, '/campaigns');
	},
	search: async () => {}
} satisfies Actions;
