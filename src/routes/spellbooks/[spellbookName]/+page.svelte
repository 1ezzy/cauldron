<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { capitalizeFirstLetter, formatSpellLevel } from '$lib/utils/string-utils.js';
	import type { Spellbook } from '@prisma/client';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, MinusCircle, CheckCircle } from '@steeze-ui/heroicons';
	import { invalidateAll } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import DeleteSpellbookModal from '$lib/components/modals/DeleteSpellbookModal.svelte';

	const modalStore = getModalStore();

	export let data;

	let spellbookData: Spellbook = data.spellbookItem;
	let spellData = data.spellbookItem.spells;

	$: groupByLevel = (spells: any) => {
		const sorted = spells.reduce((acc: any, spell: any) => {
			const { level } = spell;

			if (!acc[level]) {
				acc[level] = [spell];
			} else {
				acc[level].push(spell);
			}

			return acc;
		}, {});

		return sorted;
	};

	$: spellData = Object.values(groupByLevel(data.spellbookItem.spells));

	$: spellbookData = data.spellbookItem;

	let userId = data.userId;
	let spellbookId = spellbookData.id;
	let spellbookName = spellbookData.spellbook_name;

	let spellsEditMode = false;
	let detailsEditMode = false;

	$: spellsEditColor = spellsEditMode ? 'text-success-500' : 'text-secondary-500';
	$: detailsEditColor = detailsEditMode ? 'text-success-500' : 'text-secondary-500';

	const modalComponent: ModalComponent = {
		ref: DeleteSpellbookModal,
		props: { userId, spellbookId, spellbookName }
	};

	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		title: 'Delete Spellbook'
	};

	const modalDeleteSpellbook = () => {
		modalStore.trigger(modal);
	};

	const removeSpell = async (spellId: string) => {
		await fetch(
			`/api/spells/remove?user_id=${userId}&spellbook_id=${spellbookId}&spell_id=${spellId}`,
			{
				method: 'POST'
			}
		);

		invalidateAll();
	};
</script>

<PageBlock>
	<h1 class="h1 mb-4 text-primary-500 text-center">{spellbookData?.spellbook_name}</h1>
	<h3 class="h3 mb-8 text-tertiary-500 text-center">
		{spellbookData?.character_name} the
		{spellbookData.class.map((word) => capitalizeFirstLetter(word)).join('/')}
	</h3>
	<div class="w-full flex flex-1">
		<div class="p-8 flex flex-col basis-2/3">
			<div class="mb-8 flex items-center">
				<h3 class="h3 mr-2 text-secondary-500">Your Spells</h3>
				{#if spellData.length > 0}
					<button
						on:click={(event) => {
							spellsEditMode = !spellsEditMode;
						}}
					>
						<Icon
							src={!spellsEditMode ? PencilSquare : CheckCircle}
							size="16px"
							theme="mini"
							class="{spellsEditColor} mt-1"
						/>
					</button>
				{/if}
				<a class="btn variant-filled-secondary ml-auto" href="/spells">Add More Spells</a>
				<!-- {:else}
					<button
						class="btn variant-filled-secondary ml-auto"
						on:click={(event) => {
							spellsEditMode = !spellsEditMode;
						}}
					>
						Finish Editing
					</button> -->
			</div>
			{#if spellData.length > 0}
				<div class="flex flex-col gap-4">
					{#each spellData as level}
						<div class="card">
							<header class="card-header flex">
								<h4 class="h4 text-tertiary-500">{formatSpellLevel(level[0].level)}s</h4>
							</header>
							<section class="p-4 flex flex-col gap-2">
								{#each level as spell}
									<div class="flex gap-2 items-center">
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
													class="text-error-500 mr-2"
												/>
											</button>{/if}
										<a href={`/spells/${spell.index}`}>{spell.name}</a>
									</div>
								{/each}
							</section>
						</div>
					{/each}
				</div>
			{:else}
				<span>No spells to display</span><br />
				<span>Click <a class="text-secondary-500" href="/spells">here</a> to add some</span>
			{/if}
		</div>
		<span class="divider-vertical my-auto h-[95%]" />
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
			<div class="mt-auto">
				<button
					class="btn variant-filled-error"
					on:click={() => {
						modalDeleteSpellbook();
					}}
				>
					Delete Spellbook
				</button>
			</div>
		</div>
	</div>
</PageBlock>
