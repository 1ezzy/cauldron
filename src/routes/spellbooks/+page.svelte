<script lang="ts">
	import { onMount } from 'svelte';
	import type { Spellbook } from '@prisma/client';
	import PageBlock from '$lib/components/PageBlock.svelte';

	let spellbooks = $state<Spellbook[]>([]);

	onMount(() => {
		getSpellbooks();
	});

	function getSpellbooks() {
		const savedSpellbooks = localStorage.getItem('spellbooks');
		if (!savedSpellbooks) {
			return;
		}

		spellbooks = JSON.parse(savedSpellbooks);
	}
</script>

<svelte:head>
	<title>Cauldron | Spellbooks</title>
</svelte:head>
<PageBlock title="Spellbooks" gapsize={8}>
	<div class="flex flex-col items-center gap-4">
		{#each spellbooks as spellbook}
			<a href={`/spellbooks/${spellbook.url}`}>{spellbook.spellbook_name}</a>
		{/each}
		<a class="mt-auto md:mt-0" href="/spellbooks/create">Create New Spellbook</a>
	</div>
</PageBlock>
