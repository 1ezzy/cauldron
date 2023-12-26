import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const className = params.className as string;
	const classRes = await prisma.class.findFirst({
		where: {
			index: className
		}
	});

	if (!classRes) {
		return json({ message: `Class '${className}' not found` }, { status: 404 });
	}

	return json(classRes);
};
