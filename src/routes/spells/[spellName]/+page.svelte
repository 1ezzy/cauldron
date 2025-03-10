<script lang="ts">
	import { onMount } from 'svelte';
	import { formatSpellLevel } from '$lib/utils/string-utils';
	import SpellDetails from '$lib/components/SpellDetails.svelte';
	import type { PageProps } from './$types';
	import type { Spellbook } from '@prisma/client';

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
