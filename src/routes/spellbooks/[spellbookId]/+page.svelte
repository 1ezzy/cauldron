<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { capitalizeFirstLetter, formatSpellLevel } from '$lib/utils/string-utils.js';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, MinusCircle, CheckCircle } from '@steeze-ui/heroicons';
	import { invalidateAll } from '$app/navigation';
	import {
		getModalStore,
		popup,
		type ModalComponent,
		type ModalSettings,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import DeleteSpellbookModal from '$lib/components/modals/DeleteSpellbookModal.svelte';
	import type { SpellbookWithClasses } from '$lib/types/spellbook-with-classes.type.js';

	const modalStore = getModalStore();

	export let data;

	let spellbookData: SpellbookWithClasses = data.spellbookItem;
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

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'right'
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

<svelte:head>
	<title>Cauldron | {spellbookData.spellbook_name}</title>
</svelte:head>
<PageBlock>
	<h1 class="h1 mb-4 text-primary-500 text-center">{spellbookData?.spellbook_name}</h1>
	<h3 class="h3 mb-8 text-tertiary-500 text-center">
		{spellbookData?.character_name} the
		{spellbookData.classes.map((word) => capitalizeFirstLetter(word.name)).join('/')}
	</h3>
	<div class="w-full flex flex-1 md:flex-row flex-col">
		<div class="p-8 flex flex-col basis-2/3">
			<div class="mb-8 flex md:flex-row flex-col md:items-center justify-center">
				<div class="flex items-center md:mb-0 mb-4">
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
				</div>
				<a class="btn variant-filled-secondary md:ml-auto w-fit" href="/spells">Add More Spells</a>
			</div>
			{#if spellData.length > 0}
				<div class="flex flex-col gap-4">
					{#each spellData as level}
						<div class="card">
							<header class="card-header flex">
								<h4 class="h4 text-tertiary-500">{formatSpellLevel(level[0].level)}s</h4>
							</header>
							<section class="p-4 flex flex-col gap-2">
								{#each level as spell (spell.id)}
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
										<a
											href={`/spells/${spell.index}`}
											class="[&>*]:pointer-events-none"
											use:popup={{ ...popupHover, target: `popupElement-${spell.id}` }}
										>
											{spell.name}
										</a>
										<div
											class="card dark:variant-filled-surface p-4 mr-12"
											data-popup={`popupElement-${spell.id}`}
										>
											<header class="card-header text-primary-500 font-bold">{spell.name}</header>
											<section class="p-4">
												<p class="font-bold">Duration: {spell.duration}</p>
												<p class="mb-2 font-bold">Range: {spell.range}</p>
												{#each spell.desc as part}
													<p class="mb-2">{part}</p>
												{/each}
											</section>
										</div>
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
		<span class="divider-vertical my-auto h-[95%] md:block hidden" />
		<hr class="md:hidden block" />
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
					{spellbookData?.spellbook_description ?? 'No description available'}
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
