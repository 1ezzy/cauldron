<script lang="ts">
	import { onMount } from 'svelte';
	import type { Spellbook } from '@prisma/client';
	import { formatSpellLevel } from '$lib/utils/string-utils';
	import SpellDetails from '$lib/components/SpellDetails.svelte';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import type { PageProps } from './$types';
	import { Button, Dialog, Radio } from 'svelte-ux';

	let { data }: PageProps = $props();

	let spellbooks = $state<Spellbook[]>([]);
	let selectedSpellbookId = $state<string>();
	let open = $state<boolean>(false);

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
<Dialog bind:open classes={{ dialog: 'mx-auto w-64 flex flex-col items-center' }}>
	<div slot="title">Add {data?.spellItem.name} To:</div>
	<div class="bt-4 flex flex-col gap-8 px-8 pt-4 pb-6">
		{#each spellbooks as spellbook}
			<Radio
				name="spellbook name"
				value={spellbook.id}
				fullWidth
				onclick={() => (selectedSpellbookId = spellbook.id)}
			>
				{spellbook.spellbook_name}
			</Radio>
		{/each}
	</div>
	<div slot="actions">
		<Button variant="fill" color="neutral" onclick={() => (open = false)}>Close</Button>
		<Button variant="fill" color="primary" onclick={() => addToSpellbook(data.spellItem.id)}>
			Add To Spellbook
		</Button>
	</div>
</Dialog>
<PageBlock
	title={data.spellItem.name}
	subtitle={formatSpellLevel(data.spellItem.level, data.spellItem.school.name)}
	gapsize={'gap-8'}
>
	<Button variant="fill" color="primary" onclick={() => (open = true)}>Add To Spellbook</Button>

	<SpellDetails spell={data.spellItem} />
</PageBlock>
