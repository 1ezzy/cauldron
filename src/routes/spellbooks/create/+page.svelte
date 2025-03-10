<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { stringToIndex } from '$lib/utils/string-utils';
	import type { Spellbook } from '@prisma/client';

	let newSpellbook: Spellbook = {} as Spellbook;

	function saveSpellbooks() {
		newSpellbook = {
			...newSpellbook,
			id: crypto.randomUUID(),
			url: stringToIndex(newSpellbook.spellbook_name),
			spell_ids: [],
			created_at: new Date(),
			updated_at: new Date()
		};

		console.log(newSpellbook);

		let savedSpellbooks = localStorage.getItem('spellbooks');
		if (savedSpellbooks) {
			let newSavedSpellbooks = JSON.parse(savedSpellbooks);
			newSavedSpellbooks.push(newSpellbook);
			localStorage.setItem('spellbooks', JSON.stringify(newSavedSpellbooks));
		} else {
			const newSavedSpellbooks = [newSpellbook];
			localStorage.setItem('spellbooks', JSON.stringify(newSavedSpellbooks));
		}
	}
</script>

<svelte:head>
	<title>Cauldron | Create Spellbook</title>
</svelte:head>
<PageBlock title="Spellbooks" subtitle="Create Spellbook" gapsize={8}>
	<div class="flex flex-col gap-4">
		<div class="flex flex-col">
			<label for="spellbook_name">Spellbook Name</label>
			<input id="spellbook_name" type="text" required bind:value={newSpellbook.spellbook_name} />
		</div>
		<div class="flex flex-col">
			<label for="character_name">Character Name</label>
			<input id="character_name" type="text" required bind:value={newSpellbook.character_name} />
		</div>
		<button class="mt-8" onclick={() => saveSpellbooks()}>Create Spellbook</button>
	</div>
</PageBlock>
