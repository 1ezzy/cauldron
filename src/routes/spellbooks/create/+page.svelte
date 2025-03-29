<script lang="ts">
	import { Button, Card, Icon, TextField } from 'svelte-ux';
	import type { Spell, Spellbook } from '@prisma/client';
	import { faArrowUpLong, faArrowDownLong } from '@fortawesome/free-solid-svg-icons';
	import { goto } from '$app/navigation';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import SpellTable from '$lib/components/SpellTable.svelte';
	import { stringToIndex } from '$lib/utils/string-utils';

	let { data } = $props();
	let spells = data.spellsItem;

	let newSpellbook: Spellbook = $state({} as Spellbook);
	let selectedSpells: Spell[] = $state([]);
	let errors = $state<boolean>(false);

	let disableSubmit = $derived<boolean>(
		!newSpellbook.spellbook_name || !newSpellbook.character_name
	);

	function addSpellToCard(spellName: string) {
		const spell = spells.find((spell) => spell.name === spellName);
		console.log(spellName, spells[0].name);
		if (spell) {
			selectedSpells.push(spell);
		}
		console.log(selectedSpells);
	}

	function saveSpellbooks() {
		if (!newSpellbook.spellbook_name || !newSpellbook.character_name) {
			errors = true;
			return;
		}

		errors = false;
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

		goto('/spellbooks');
	}
</script>

<svelte:head>
	<title>Cauldron | Create Spellbook</title>
</svelte:head>
<PageBlock title="Spellbooks" subtitle="Create Spellbook" gapsize={'gap-8'}>
	<div class="flex w-full flex-1 flex-col gap-16">
		<div class="flex basis-1/3 flex-row justify-between gap-16">
			<div class="flex basis-1/2 flex-col gap-8">
				<TextField
					required
					type="text"
					label="Spellbook Name"
					placeholder="Enter a spellbook name"
					error={!newSpellbook.spellbook_name && errors ? 'Required field' : false}
					bind:value={newSpellbook.spellbook_name}
				/>
				<TextField
					required
					type="text"
					label="Character Name"
					placeholder="Enter a character name"
					error={!newSpellbook.character_name && errors ? 'Required field' : false}
					bind:value={newSpellbook.character_name}
				/>
				<TextField
					classes={{ input: 'min-h-[80px]' }}
					multiline
					label="Description"
					placeholder="Enter an optional description"
					error={!newSpellbook.character_name && errors ? 'Required field' : false}
					bind:value={newSpellbook.spellbook_description}
				/>
				<Button
					variant="fill"
					color="success"
					class="mt-4"
					disabled={disableSubmit}
					onclick={() => saveSpellbooks()}
				>
					Create Spellbook
				</Button>
			</div>
			<Card
				class="flex basis-1/2 border-1"
				title="Spells To Add"
				subheading="These spells will be added on spellbook creation"
			>
				{#each selectedSpells as spell}
					{spell.name}
				{/each}
			</Card>
		</div>
		<div class="flex basis-2/3">
			<div class="flex flex-1 flex-col justify-center">
				<div class="arrows self-center">
					<span class="mr-4">Add Spells</span>
					<Icon data={faArrowUpLong} size={64} />
					<Icon data={faArrowDownLong} />
				</div>
				<SpellTable
					class="h-full basis-2/3"
					data={spells}
					pageCount={10}
					nameCellType="modal"
					addSpell={(value: string) => addSpellToCard(value)}
				/>
			</div>
		</div>
	</div>
</PageBlock>
