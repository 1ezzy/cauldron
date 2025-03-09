<script lang="ts">
	import type { PageProps } from './$types';
	import { formatSpellLevel } from '$lib/utils/string-utils';
	import type { Spellbook } from '@prisma/client';
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
		let spellbookToUpdate = spellbooks.find((spellbook) => spellbook.spellbook_name === 'test');
		if (spellbookToUpdate) {
			if (spellbookToUpdate.spell_ids) {
				spellbookToUpdate.spell_ids = [...spellbookToUpdate.spell_ids, spellId];
			} else {
				spellbookToUpdate.spell_ids = [spellId];
			}

			const index = spellbooks.findIndex((spellbook) => spellbook.spellbook_name === 'test');
			spellbooks[index] = spellbookToUpdate;
			localStorage.setItem('spellbooks', JSON.stringify(spellbooks));
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
