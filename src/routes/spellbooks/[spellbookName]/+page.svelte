<script lang="ts">
	import { onMount } from 'svelte';
	import type { Spellbook } from '@prisma/client';
	import { page } from '$app/state';

	$: spellbookSlug = page.params.spellbookName;

	let spellbook: Spellbook;

	onMount(() => {
		const savedSpellbooks = localStorage.getItem('spellbooks');
		if (savedSpellbooks) {
			const spellbooks = JSON.parse(savedSpellbooks);
			spellbook = spellbooks.find((book: Spellbook) => book.spellbook_name === spellbookSlug);
		}
	});
</script>

<svelte:head>
	<title>Cauldron | {spellbook?.spellbook_name}</title>
</svelte:head>
<div class="flex flex-col items-center gap-2">
	<span class="mb-4 font-bold">{spellbook?.spellbook_name}</span>
	<span>Character: {spellbook?.character_name}</span>
</div>
