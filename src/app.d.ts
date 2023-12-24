declare global {
	namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest;
			user: import('lucia').User;
		}

		interface Platform {
			env: {
				MONGODB_URL: KVNamespace;
				ACCELERATE_URL: KVNamespace;
			};
		}
	}
}

declare global {
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = {
			username: string;
			discordUsername: string;
			created_at: Date;
			updated_at: Date;
		};
		type DatabaseSessionAttributes = Record<string, never>;
	}
}

// THIS IS IMPORTANT!!!
export {};
