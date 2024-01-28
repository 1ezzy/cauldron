import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { v2 as cloudinary } from 'cloudinary';
import {
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET
} from '$env/static/private';

cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET
});

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(302, '/login');

	const username = session.user.discordUsername;

	return { username };
}) satisfies PageServerLoad;
