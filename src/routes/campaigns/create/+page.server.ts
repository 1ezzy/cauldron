import { get, writable } from 'svelte/store';
import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { UserSchema } from '/prisma/generated/zod';

import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const userStore = writable('');

const createCampaignSchema = z.object({
	name: z
		.string({ required_error: 'Campaign name is required' })
		.min(1)
		.max(50, { message: 'Must be less than 50 characters' }),
	description: z.string().max(500, { message: 'Must be less than 500 characters' }),
	users: UserSchema.array()
});

const searchSchema = z.object({
	username: z.string().min(1).max(50, { message: 'Must be less than 50 characters' })
});

export const load = (async ({ locals }) => {
	const user = await locals.user;
	if (!user) redirect(307, '/login');

	userStore.set(user.id);

	const campaignForm = await superValidate(createCampaignSchema);
	const searchForm = await superValidate(searchSchema);

	return { campaignForm, searchForm };
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ request, fetch }) => {
		const form = await superValidate(request, createCampaignSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const createRes = await fetch(
			`/api/campaigns/create?
			owner_id=${get(userStore)}&
			campaign_name=${form.data.name}&
			campaign_description=${form.data.description}&
			campaign_users=${JSON.stringify(form.data.users)}`,
			{
				method: 'POST'
			}
		);
		const campaignData = await createRes.json();

		return {
			success: true,
			status: 200,
			form: form,
			campaignId: campaignData.id
		};
	},

	search: async ({ request }) => {
		const form = await superValidate(request, searchSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const searchedUsers = await prisma.user.findMany({
			where: {
				username: {
					contains: form.data.username
				}
			},
			include: {
				friends: true
			}
		});

		return { status: 200, form: form, users: searchedUsers };
	}
} satisfies Actions;
