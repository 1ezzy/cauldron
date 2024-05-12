<script lang="ts">
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowLeft, ArrowRight } from '@steeze-ui/heroicons';
	import CampaignModal from '$lib/components/modals/CampaignModal.svelte';
	import type { CampaignWithUserFields } from '$lib/types/campaign-with-user-fields.type';
	import type { UserWithRequestedCampaigns } from '$lib/types/user-with-requested-campaigns.type';
	import CampaignDetails from './CampaignDetails.svelte';
	import CampaignList from './CampaignList.svelte';

	const modalStore = getModalStore();

	export let data;

	let campaignData: CampaignWithUserFields[] = data.campaignsItem;
	let requestedCampaignData: CampaignWithUserFields[] = data.requestedCampaignsItem;
	let ownerData: UserWithRequestedCampaigns = data.ownerItem;

	$: campaignId = selectedCampaign?.id;
	$: campaignName = selectedCampaign?.campaign_name;

	$: campaignData, console.log(campaignData);

	let selectedCampaign: CampaignWithUserFields | null = campaignData ? campaignData[0] : null;
	let campaignMode: 'campaigns' | 'requested_campaigns' = 'campaigns';
	$: campaignMode,
		campaignMode === 'campaigns'
			? (selectedCampaign = campaignData[0])
			: (selectedCampaign = requestedCampaignData[0]);

	const changeSelectedCampaign = (event: CustomEvent) => {
		selectedCampaign = event.detail.campaign;
	};

	let modalComponent: ModalComponent;
	$: modalComponent = {
		ref: CampaignModal,
		props: { data, campaignId, campaignName }
	};

	let modal: ModalSettings;
	$: modal = {
		type: 'component',
		component: modalComponent,
		title: 'Join Campaign'
	};

	const modalJoinCampaign = () => {
		modalStore.trigger(modal);
	};
</script>

<svelte:head>
	<title>Cauldron | Campaigns</title>
</svelte:head>
<PageBlock>
	<div class="w-full mb-8 flex md:flex-row flex-col md:gap-0 gap-2 items-center">
		<div class="basis-1/3" />
		<h1 class="h1 text-primary-500 text-center basis-1/3">Campaigns</h1>
		<a href="/campaigns/create" class="flex justify-end basis-1/3">
			<button class="btn variant-filled-primary">Create a Campaign</button>
		</a>
	</div>
	<div
		class="w-full p-8 overflow-auto flex md:flex-row flex-col flex-auto xl:gap-32 md:gap-24 gap-8"
	>
		<div class="flex flex-col md:min-w-[256px] min-w-auto">
			{#if campaignMode === 'campaigns'}
				<div class="mb-4 flex flex-row justify-between gap-4">
					<h2 class="h2 text-secondary-500 text-center">Campaigns</h2>
					<button
						on:click={() => {
							campaignMode = 'requested_campaigns';
							selectedCampaign = ownerData.requested_campaigns[0] ?? null;
						}}
					>
						<Icon src={ArrowRight} theme="mini" size="32px" />
					</button>
				</div>
			{:else if campaignMode === 'requested_campaigns'}
				<div class="mb-4 flex flex-row justify-between gap-4">
					<h2 class="h2 text-secondary-500 text-center">Requests</h2>
					<button
						on:click={() => {
							campaignMode = 'campaigns';
							selectedCampaign = campaignData[0] ?? null;
						}}
					>
						<Icon src={ArrowLeft} theme="mini" size="32px" />
					</button>
				</div>
			{/if}
			<div
				class="card md:min-h-0 min-h-[288px] p-4 flex flex-col flex-1 gap-4 overflow-y-scroll overflow-x-hidden whitespace-nowrap text-ellipsis"
			>
				{#if campaignMode === 'campaigns'}
					<CampaignList
						{campaignData}
						noCampaignText="No Campaigns to Display"
						on:selectedCampaignChanged={changeSelectedCampaign}
					/>
				{:else if campaignMode === 'requested_campaigns'}
					<CampaignList
						campaignData={requestedCampaignData}
						noCampaignText="No Requests to Display"
						on:selectedCampaignChanged={changeSelectedCampaign}
					/>
				{/if}
			</div>
		</div>
		{#if campaignMode === 'campaigns'}
			{#if selectedCampaign}
				<CampaignDetails {selectedCampaign}>
					<a class="mt-auto" href="/campaigns/{selectedCampaign.id}">
						<button class="btn variant-filled-secondary">View Campaign</button>
					</a>
				</CampaignDetails>
			{:else}
				<span class="my-auto flex flex-col basis-3/4 text-wrap text-center">
					You aren't in any campaigns
				</span>
			{/if}
		{:else if campaignMode === 'requested_campaigns'}
			{#if selectedCampaign}
				<CampaignDetails {selectedCampaign}>
					<button class="mt-auto btn variant-filled-success" on:click={() => modalJoinCampaign()}
						>Join Campaign</button
					>
				</CampaignDetails>
			{:else}
				<span class="my-auto flex flex-col basis-3/4 text-wrap text-center">
					You haven't been requested to join any campaigns
				</span>
			{/if}
		{/if}
	</div>
</PageBlock>
