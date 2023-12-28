<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';

	export let data;
	const username = data.username;
</script>

<svelte:head>
	<title>{'Cauldron | Dashboard'}</title>
</svelte:head>

<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Dashboard</h1>
	<section class="w-full flex-1 flex flex-col items-center">
		<h3 class="h3 mb-2">Hey there, {username}!</h3>
		<div class="my-auto">
			<p>More content coming soon...</p>
		</div>
	</section>
</PageBlock>
