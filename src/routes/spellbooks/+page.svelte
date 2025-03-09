<script lang="ts">
	import { onMount } from 'svelte';
	import type { Spellbook } from '@prisma/client';

	let spellbooks: Spellbook[] = [];

	onMount(() => {
		const savedSpellbooks = localStorage.getItem('spellbooks');
		if (savedSpellbooks) {
			spellbooks = JSON.parse(savedSpellbooks);
			console.log(spellbooks);
		}
	});
</script>

<svelte:head>
	<title>Cauldron | Spellbooks</title>
</svelte:head>
<div class="flex flex-col items-center gap-2">
	<a href="/spellbooks/create">Create Spellbook Page</a>
	<span class="mb-4 font-bold">Spellbooks</span>
	{#each spellbooks as spellbook}
		<a href={`/spellbooks/${spellbook.spellbook_name}`}>{spellbook.spellbook_name}</a>
	{/each}
</div>
