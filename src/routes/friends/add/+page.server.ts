import { get, writable } from 'svelte/store';
import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import type { ToastSettings } from '@skeletonlabs/skeleton';

const userStore = writable('');

const addFriendSchema = z.object({
	friend_username: z
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
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, addFriendSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const friend = await prisma.user.findUnique({
			where: {
				username: form.data.friend_username
			}
		});

		const requestRes = await fetch(
			`/api/requestedFriends/add?
				user_id=${get(userStore)}&
				friend_id=${friend.id}`,
			{
				method: 'POST'
			}
		);
		const friendRequestRes = await fetch(
			`/api/requestedFriends/add?
				user_id=${friend.id}&
				friend_id=${get(userStore)}`,
			{
				method: 'POST'
			}
		);
		const sentRequestRes = await fetch(
			`/api/sentRequests/add?
				user_id=${get(userStore)}&
				friend_id=${friend.id}`,
			{
				method: 'POST'
			}
		);

		if (!requestRes.ok) {
			const data = await requestRes.json();
			const toastAddRequestedFail: ToastSettings = {
				message: `Error: ${data.message}`,
				background: 'variant-filled-error'
			};
			return { status: 404, form: form, toast: toastAddRequestedFail };
		} else if (!friendRequestRes.ok) {
			const data = await friendRequestRes.json();
			const toastAddRequestedFail: ToastSettings = {
				message: `Error: ${data.message}`,
				background: 'variant-filled-error'
			};
			return { status: 404, form: form, toast: toastAddRequestedFail };
		} else if (!sentRequestRes.ok) {
			const data = await sentRequestRes.json();
			const toastAddRequestedFail: ToastSettings = {
				message: `Error: ${data.message}`,
				background: 'variant-filled-error'
			};
			return { status: 404, form: form, toast: toastAddRequestedFail };
		} else {
			const data = await friendRequestRes.json();
			const toastAddRequestedSuccess: ToastSettings = {
				message: `Friend request sent to ${data.username}`,
				background: 'variant-filled-success'
			};
			return { status: 200, form: form, toast: toastAddRequestedSuccess };
		}
	}
} satisfies Actions;
