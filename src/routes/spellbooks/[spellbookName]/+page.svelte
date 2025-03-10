<script lang="ts">
	import { onMount } from 'svelte';
	import type { Spell, Spellbook } from '@prisma/client';
	import { page } from '$app/state';
	import SpellDetails from '$lib/components/SpellDetails.svelte';
	import PageBlock from '$lib/components/PageBlock.svelte';

	let spellbook = $state<Spellbook | undefined>();
	let spellbooks = $state<Spellbook[]>();
	let spellbookSlug = $state(page.params.spellbookName);

	let spells = $state<Spell[]>([]);
	let activeSpell = $state<Spell>();
	let loadingSpells = $state<boolean>(true);

	onMount(() => {
		getSpellbooks();
	});

	async function getSpellbooks() {
		const savedSpellbooks = localStorage.getItem('spellbooks');
		if (!savedSpellbooks) {
			return;
		}

		spellbooks = JSON.parse(savedSpellbooks);
		if (!spellbooks) {
			return;
		}

		spellbook = spellbooks.find((book: Spellbook) => book.url === spellbookSlug);

		if (spellbook) {
			spells = await getSpells(spellbook);
			loadingSpells = false;
		}
	}

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
{#if spellbook}
	<PageBlock
		title={spellbook.spellbook_name}
		subtitle={`A spellbook for ${spellbook?.character_name}`}
		gapsize={8}
	>
		<div
			class="flex w-full flex-1 flex-col justify-start gap-16
		md:flex-row md:justify-center md:gap-4 md:overflow-y-hidden"
		>
			<div
				class="flex flex-col items-center gap-2 border text-center
			md:flex-1 md:basis-1/4 md:p-8"
			>
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
			<div
				class="flex flex-col items-center gap-8
			md:basis-3/4 md:overflow-y-scroll md:p-8"
			>
				{#if activeSpell}
					<span class:font-bold={activeSpell}>{activeSpell?.name}</span>
					<SpellDetails spell={activeSpell} />
				{:else}
					<span>Select a spell on the left to view its details</span>
				{/if}
			</div>
		</div>
	</PageBlock>
{/if}
