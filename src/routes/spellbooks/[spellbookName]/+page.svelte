<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { capitalizeFirstLetter } from '$lib/utils/string-utils.js';
	import type { Spellbook } from '@prisma/client';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, MinusCircle } from '@steeze-ui/heroicons';
	import { invalidateAll } from '$app/navigation';

	export let data;

	let spellbookData: Spellbook = data.spellbookItem;
	$: spellbookData = data.spellbookItem;

	let userId = data.userId;
	let selectedSpellbookId = spellbookData.id;

	let spellsEditMode = false;
	let detailsEditMode = false;

	const removeSpell = async (spellId: string) => {
		await fetch(
			`/api/spells/remove?user_id=${userId}&spellbook_id=${selectedSpellbookId}&spell_id=${spellId}`,
			{
				method: 'POST'
			}
		);

		invalidateAll();
	};
</script>

<PageBlock>
	<h1 class="h1 mb-4 text-primary-500">{spellbookData?.spellbook_name}</h1>
	<h3 class="h3 mb-8 text-tertiary-500">
		{spellbookData?.character_name} the
		{spellbookData.class.map((word) => capitalizeFirstLetter(word)).join('/')}
	</h3>
	<div class="w-full flex flex-1">
		<div class="p-8 flex flex-col basis-2/3">
			<div class="mb-8 flex items-center">
				<h3 class="h3 mr-4 text-secondary-500">Your Spells</h3>
				<button
					on:click={(event) => {
						spellsEditMode = !spellsEditMode;
					}}
				>
					<Icon src={PencilSquare} size="16px" theme="mini" class="text-secondary-500 mt-1" />
				</button>
			</div>
			{#if spellbookData?.spells.length > 0}
				<div class="flex flex-1 flex-col gap-2">
					{#key spellbookData.spell_ids}
						{#each spellbookData.spells as spell}
							<div class="flex items-center">
								{#if spellsEditMode}
									<button
										on:click={() => {
											removeSpell(spell.id);
										}}
									>
										<Icon
											src={MinusCircle}
											size="16px"
											theme="mini"
											class="text-secondary-500 mr-2 mt-1"
										/>
									</button>
								{/if}
								<div class="flex">
									<a href="/spells/{spell.index}"><h4 class="h4">{spell.name}</h4></a>
									<span class="badge variant-filled-tertiary">Level {spell.level}</span>
								</div>
							</div>
						{/each}
					{/key}
					{#if spellsEditMode}
						<button
							class="mt-auto self-start btn variant-filled-secondary"
							on:click={() => {
								spellsEditMode = !spellsEditMode;
							}}>Finish Editing</button
						>
					{:else}
						<button
							class="mt-auto self-start btn variant-filled-primary"
							on:click={() => {
								spellsEditMode = !spellsEditMode;
							}}>Add More Spells</button
						>
					{/if}
				</div>
			{:else}
				<span>No spells to display</span><br />
				<span>Click <a class="text-secondary-500" href="/spells">here</a> to add some</span>
			{/if}
		</div>
		<span class="divider-vertical my-auto h-[90%]" />
		<div class="p-8 basis-1/3 flex flex-col">
			<div class="mb-8 flex items-center">
				<h3 class="h3 mr-4 text-secondary-500">Details</h3>
				<!-- <button
					on:click={() => {
						detailsEditMode = !detailsEditMode;
					}}
				>
					<Icon src={PencilSquare} size="16px" theme="mini" class="text-secondary-500 mt-1" />
				</button> -->
			</div>
			<div class="mb-8">
				<h4 class="h4 mb-2 text-tertiary-500">Description</h4>
				{#if !detailsEditMode}
					{spellbookData?.spellbook_description}
				{:else}{/if}
			</div>
			<div class="mb-8">
				<h4 class="h4 mb-2 text-tertiary-500">Created</h4>
				{new Date(spellbookData?.created_at).toDateString()}
			</div>
		</div>
	</div>
</PageBlock>
