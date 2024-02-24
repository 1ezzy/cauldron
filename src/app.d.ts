declare global {
	namespace App {
		interface Platform {
			env: {
				MONGODB_URL: KVNamespace;
				ACCELERATE_URL: KVNamespace;
			};
		}

		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
	}
}

// THIS IS IMPORTANT!!!
export {};
