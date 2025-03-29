<script lang="ts">
	import { onMount } from 'svelte';
	import type { Spellbook } from '@prisma/client';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { Button } from 'svelte-ux';

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
<PageBlock title="Spellbooks" gapsize={'gap-8'}>
	<div class="flex flex-col items-center gap-8">
		{#each spellbooks as spellbook}
			<a href={`/spellbooks/${spellbook.url}`}>{spellbook.spellbook_name}</a>
		{/each}
		<Button variant="fill" color="success" class="" href="/spellbooks/create"
			>Create New Spellbook</Button
		>
	</div>
</PageBlock>
