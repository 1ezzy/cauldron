<script lang="ts">
	import type { PageProps } from './$types';
	import { formatSpellLevel } from '$lib/utils/string-utils';
	import type { Spell, Spellbook } from '@prisma/client';
	import { onMount } from 'svelte';
	import SpellDetails from '$lib/components/SpellDetails.svelte';

	let { data }: PageProps = $props();

	let spellbooks: Spellbook[] = [];

	onMount(() => {
		const savedSpellbooks = localStorage.getItem('spellbooks');
		if (savedSpellbooks) {
			spellbooks = JSON.parse(savedSpellbooks);
		}
	});

	function addToSpellbook(spellId: string): void {
		const spellbookIndex = spellbooks.findIndex((spellbook) => spellbook.url === 'test-spellbook');
		let spellbookToUpdate = spellbooks[spellbookIndex];
		const isSpellInSpellbook = spellbookToUpdate.spell_ids.some((id) => id === spellId);

		if (spellbookToUpdate && !isSpellInSpellbook) {
			spellbookToUpdate.spell_ids = [...spellbookToUpdate.spell_ids, spellId];
			spellbooks[spellbookIndex] = spellbookToUpdate;
			console.log(spellbookToUpdate);

			localStorage.setItem('spellbooks', JSON.stringify(spellbooks));
		} else {
			console.log('idiot');
		}
	}
</script>

<svelte:head>
	<title>Cauldron | Spellbooks</title>
</svelte:head>
<div class="flex flex-col items-center gap-8">
	<div class="flex flex-col items-center gap-2">
		<div class="flex gap-4">
			<span class="font-bold">{data.spellItem.name}</span>
			<span>|</span>
			<span>{formatSpellLevel(data.spellItem.level, data.spellItem.school.name)}</span>
		</div>
		<button onclick={() => addToSpellbook(data.spellItem.id)}>Add To Spellbook</button>
	</div>
	<SpellDetails spell={data.spellItem} />
</div>
