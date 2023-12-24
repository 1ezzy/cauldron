<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="container h-full mx-auto p-10 flex flex-col justify-center items-center">
	<h1 class="h1 mb-8 text-primary-500">Log In</h1>
	<a class="btn variant-filled-primary" href="/api/login/discord">Sign in with Discord</a>
	<!-- <form method="POST" class="flex flex-col gap-4" use:enhance>
		<label class="label" for="username">
			<span>Username</span>
			<input class="input" type="text" name="username" id="username" /><br />
		</label>
		<label for="password">
			<span>Password</span>
			<input class="input" type="password" name="password" id="password" /><br />
		</label>
		<button class="mt-6 btn variant-filled-primary" type="submit">Sign in</button>
	</form>
	<div class="mt-4 flex flex-col gap-2 items-center">
		<span>Need an account? <a class="underline" href="/signup">Sign up</a></span>
	</div> -->
</div>
