<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { capitalizeFirstLetter, formatSpellLevel } from '$lib/utils/string-utils.js';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, MinusCircle, CheckCircle } from '@steeze-ui/heroicons';
	import { invalidateAll } from '$app/navigation';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import DeleteCampaignModal from '$lib/components/modals/DeleteCampaignModal.svelte';
	import type { Campaign, User } from '@prisma/client';

	const modalStore = getModalStore();

	export let data;

	let campaignData: Campaign = data.campaignItem;
	let campaignOwner: User = data.campaignItem.owner_user;

	let ownerId: string = campaignOwner.id;
	let campaignId: string = campaignData.id;
	let campaignName: string = campaignData.campaign_name;
	let isCampaignOwner: boolean = ownerId === data.userId;

	const modalComponent: ModalComponent = {
		ref: DeleteCampaignModal,
		props: { ownerId, campaignId, campaignName }
	};

	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		title: 'Delete Campaign'
	};

	const modalDeleteCampaign = () => {
		modalStore.trigger(modal);
	};
</script>

<svelte:head>
	<title>Cauldron | {campaignData.campaign_name}</title>
</svelte:head>
<PageBlock>
	<h1 class="h1 mb-4 text-primary-500 text-center">{campaignData?.campaign_name}</h1>
	<h3 class="h3 mb-8 text-tertiary-500 text-center">
		Created By
		{campaignOwner.username}
	</h3>
	<div class="w-full flex flex-1 md:flex-row flex-col">
		<div class="p-8 flex flex-col basis-2/3">
			<div class="mb-8 flex md:flex-row flex-col md:items-center justify-center">
				<div class="flex items-center md:mb-0 mb-4">
					<h3 class="h3 mr-2 text-secondary-500">Campaign Members</h3>
				</div>
				<a class="btn variant-filled-secondary md:ml-auto w-fit" href="/spells">Add More Members</a>
			</div>
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
				<span>{campaignData?.campaign_description ?? 'No description available'}</span>
			</div>
			<div class="mb-8">
				<h4 class="h4 mb-2 text-tertiary-500">Created</h4>
				{new Date(campaignData?.created_at).toDateString()}
			</div>
			{#if isCampaignOwner}
				<div class="mt-auto">
					<button
						class="btn variant-filled-error"
						on:click={() => {
							modalDeleteCampaign();
						}}
					>
						Delete Campaign
					</button>
				</div>
			{/if}
		</div>
	</div>
</PageBlock>
