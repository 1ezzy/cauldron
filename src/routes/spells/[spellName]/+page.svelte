<script lang="ts">
	import { onMount } from 'svelte';
	import type { Spellbook } from '@prisma/client';
	import { formatSpellLevel } from '$lib/utils/string-utils';
	import SpellDetails from '$lib/components/SpellDetails.svelte';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

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

	function addToSpellbook(spellId: string): void {
		// TODO: update findIndex to use selected spellbook, probably a 2nd argument
		const spellbookIndex = spellbooks.findIndex((spellbook) => spellbook.url === 'test-spellbook');
		let spellbookToUpdate = spellbooks[spellbookIndex];
		const isSpellInSpellbook = spellbookToUpdate.spell_ids.some((id) => id === spellId);

		if (spellbookToUpdate && !isSpellInSpellbook) {
			spellbookToUpdate.spell_ids = [...spellbookToUpdate.spell_ids, spellId];
			spellbooks[spellbookIndex] = spellbookToUpdate;

			localStorage.setItem('spellbooks', JSON.stringify(spellbooks));
		}
	}
</script>

<svelte:head>
	<title>Cauldron | Spellbooks</title>
</svelte:head>
<PageBlock
	title={data.spellItem.name}
	subtitle={formatSpellLevel(data.spellItem.level, data.spellItem.school.name)}
	gapsize={8}
>
	<button onclick={() => addToSpellbook(data.spellItem.id)}>Add To Spellbook</button>

	<SpellDetails spell={data.spellItem} />
</PageBlock>
