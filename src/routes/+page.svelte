<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';

	export let data;
	const username = data.username;
</script>

<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Dashboard</h1>
	<section class="w-full flex flex-col items-center">
		<h3 class="h3 mb-2">Hey there, {username}!</h3>
		<p>
			Click <a class="text-secondary-500" href="/spellbooks/create">here</a> to create a new spellbook
		</p>
	</section>
</PageBlock>
