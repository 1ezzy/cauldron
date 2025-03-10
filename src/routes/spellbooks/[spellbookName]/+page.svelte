<script lang="ts">
	import { onMount } from 'svelte';
	import type { Spell, Spellbook } from '@prisma/client';
	import { page } from '$app/state';
	import SpellDetails from '$lib/components/SpellDetails.svelte';

	let spellbook = $state<Spellbook>();
	let spellbooks = $state<Spellbook[]>();
	let spellbookSlug = $state(page.params.spellbookName);

	let spells = $state<Spell[]>([]);
	let activeSpell = $state<Spell>();
	let loadingSpells = $state<boolean>(true);

	onMount(async () => {
		const savedSpellbooks = localStorage.getItem('spellbooks');
		if (savedSpellbooks) {
			spellbooks = JSON.parse(savedSpellbooks);
			spellbook = spellbooks?.find((book: Spellbook) => book.url === spellbookSlug);

			if (spellbook) {
				spells = await getSpells(spellbook);
				loadingSpells = false;
			}
		}
	});

	async function getSpells(spellbook: Spellbook): Promise<Spell[]> {
		if (spellbook.spell_ids?.length > 0) {
			const response = await fetch('/api/spells/byIds', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ spellIds: spellbook.spell_ids })
			});

			if (response.ok) {
				return await response.json();
			}
		}
		return [];
	}

	function removeSpell(spellId: string): void {
		if (spellbook && spellbooks) {
			const newSpellbookIds = spellbook?.spell_ids.filter((id) => id !== spellId) ?? [];
			const newSpellbook = {
				...spellbook,
				spell_ids: newSpellbookIds
			};
			const newSpellbooks = [
				...spellbooks.filter((book) => book.id !== spellbook?.id),
				newSpellbook
			];
			const newSpells = spells.filter((spell) => {
				return spell.id !== spellId;
			});

			spellbook = newSpellbook;
			spellbooks = newSpellbooks;
			spells = newSpells;
			localStorage.setItem('spellbooks', JSON.stringify(newSpellbooks));
		}
	}
</script>

<svelte:head>
	<title>Cauldron | {spellbook?.spellbook_name}</title>
</svelte:head>
<div class="flex flex-1 flex-col items-center gap-8">
	<div class="flex gap-4">
		<span class="mb-4 font-bold"> {spellbook?.spellbook_name}</span>
		<span>|</span>
		<span>A spellbook for {spellbook?.character_name}</span>
	</div>

	<div
		class="flex w-full flex-1 flex-col justify-start gap-16 md:flex-row md:justify-center md:gap-0 md:overflow-y-hidden"
	>
		<div class="flex flex-col items-center gap-2 border md:flex-1 md:basis-1/4">
			<span>Spells:</span>
			{#if spells && spells.length > 0}
				{#each spells as spell}
					<div class="flex gap-2">
						<button
							onclick={() => {
								activeSpell = spell;
							}}>{spell.name}</button
						>
						<button
							class="text-red-500"
							onclick={() => {
								removeSpell(spell.id);
							}}>(x)</button
						>
					</div>
				{/each}
			{:else if loadingSpells}
				<span>Loading</span>
			{:else}
				<span>No spells to display</span>
			{/if}
		</div>
		<div class="flex flex-col items-center gap-8 md:basis-3/4 md:overflow-y-scroll md:p-8">
			<span class:font-bold={activeSpell}>{activeSpell?.name ?? 'No Spell Selected'}</span>
			{#if activeSpell}
				<SpellDetails spell={activeSpell} />
			{/if}
		</div>
	</div>
</div>
