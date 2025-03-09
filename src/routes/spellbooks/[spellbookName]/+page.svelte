<script lang="ts">
	import { onMount } from 'svelte';
	import type { Spell, Spellbook } from '@prisma/client';
	import { page } from '$app/state';
	import SpellDetails from '$lib/components/SpellDetails.svelte';

	let spellbookSlug = $state(page.params.spellbookName);

	let spellbook = $state<Spellbook>();
	let spells = $state<Spell[]>([]);
	let activeSpell = $state<Spell>();

	onMount(async () => {
		const savedSpellbooks = localStorage.getItem('spellbooks');
		if (savedSpellbooks) {
			const spellbooks = JSON.parse(savedSpellbooks);
			spellbook = spellbooks.find((book: Spellbook) => book.spellbook_name === spellbookSlug);

			if (spellbook) {
				spells = await getSpells(spellbook);
			}
		}
	});

	async function getSpells(spellbook: Spellbook): Promise<Spell[]> {
		if (spellbook?.spell_ids && spellbook.spell_ids.length > 0) {
			try {
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
			} catch (error) {
				console.error('Failed to fetch spells', error);
			}
		}
		return [];
	}
</script>

<svelte:head>
	<title>Cauldron | {spellbook?.spellbook_name}</title>
</svelte:head>
<div class="flex flex-1 flex-col items-center gap-4">
	<div class="flex gap-4">
		<span class="mb-4 font-bold"> {spellbook?.spellbook_name}</span>
		<span>|</span>
		<span>A spellbook for {spellbook?.character_name}</span>
	</div>

	{#if spells.length > 0}
		<div class="flex h-full w-full flex-col justify-start gap-16 md:flex-row md:justify-center">
			<div class="flex flex-col items-center gap-2 border md:basis-1/3">
				{#if spellbook && spellbook.spell_ids.length > 0}
					<span>Spells:</span>
					{#each spells as spell}
						<button
							onclick={() => {
								activeSpell = spell;
							}}
						>
							<span>{spell.name}</span>
						</button>
					{/each}
				{:else}
					<span>No spells to display</span>
				{/if}
			</div>
			<div class="flex flex-col items-center gap-8 md:basis-2/3">
				<span class:font-bold={activeSpell}>{activeSpell?.name ?? 'No Spell Selected'}</span>
				{#if activeSpell}
					<SpellDetails spell={activeSpell} />
				{/if}
			</div>
		</div>
	{:else}
		<div>
			<span>There are no spells in this spellbook</span>
		</div>
	{/if}
</div>
