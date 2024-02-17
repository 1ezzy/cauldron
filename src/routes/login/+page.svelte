<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<svelte:head>
	<title>Cauldron | Login</title>
</svelte:head>
<div class="container h-full mx-auto p-10 flex flex-col justify-center items-center">
	<h1 class="h1 mb-8 text-primary-500">Log In</h1>
	<a class="btn variant-filled-primary" href="/api/login/discord">Sign in with Discord</a>
</div>
