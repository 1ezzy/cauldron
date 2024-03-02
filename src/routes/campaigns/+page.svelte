<script lang="ts">
	import { PUBLIC_CLOUDINARY_BASE_URL } from '$env/static/public';
	import type { Campaign, User } from '@prisma/client';
	import { Avatar } from '@skeletonlabs/skeleton';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowLeft, ArrowRight } from '@steeze-ui/heroicons';

	export let data;

	let campaignData: Campaign[] = data.campaignsItem;
	let ownerData: User = data.ownerItem;
	let ownerUsername: string = data.ownerUsername;

	let selectedCampaign: Campaign = campaignData[0];

	let campaignMode: 'campaigns' | 'requested_campaigns' = 'campaigns';

	const changeSelectedCampaign = (campaign: Campaign) => {
		selectedCampaign = campaign;
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
	<div class="w-full p-8 overflow-auto flex md:flex-row flex-col flex-auto gap-8">
		<div class="flex flex-col basis-1/4 md:truncate">
			{#if campaignMode === 'campaigns'}
				<div class="mb-4 flex flex-row justify-between gap-4">
					<h2 class="h2 text-secondary-500 text-center">Campaigns</h2>
					<button
						on:click={() => {
							campaignMode = 'requested_campaigns';
							selectedCampaign = ownerData.requested_campaigns[0];
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
							selectedCampaign = campaignData[0];
						}}
					>
						<Icon src={ArrowLeft} theme="mini" size="32px" />
					</button>
				</div>
			{/if}
			<div class="card p-4 flex flex-col flex-1 gap-4 md:min-h-0 min-h-[288px] overflow-y-scroll">
				{#if campaignMode === 'campaigns'}
					{#if campaignData.length > 0}
						{#each campaignData as campaign}
							<button
								class="btn variant-filled-surface p-2 flex flex-row justify-start gap-1 rounded-lg"
								on:click={() => changeSelectedCampaign(campaign)}
								on:keydown={() => changeSelectedCampaign(campaign)}
							>
								<Avatar
									src="{PUBLIC_CLOUDINARY_BASE_URL}{campaign.campaign_pic_url}"
									alt="Profile Picture for {campaign.campaign_name}"
									rounded="rounded-full"
									background="bg-transparent"
									width="w-8"
									height="h-8"
								/>
								<h4 class="h4 truncate">{campaign.campaign_name}</h4>
							</button>
						{/each}
					{:else}
						<span class="text-wrap text-center">No campaigns to display</span>
					{/if}
				{:else if campaignMode === 'requested_campaigns'}
					{#if ownerData.requested_campaigns.length > 0}
						{#each ownerData.requested_campaigns as campaign}
							<button
								class="btn variant-filled-surface p-2 flex flex-row justify-start gap-1 rounded-lg"
								on:click={() => changeSelectedCampaign(campaign)}
								on:keydown={() => changeSelectedCampaign(campaign)}
							>
								<Avatar
									src="{PUBLIC_CLOUDINARY_BASE_URL}{campaign.campaign_pic_url}"
									alt="Profile Picture for {campaign.campaign_name}"
									rounded="rounded-full"
									background="bg-transparent"
									width="w-8"
									height="h-8"
								/>
								<h4 class="h4 truncate">{campaign.campaign_name}</h4>
							</button>
						{/each}
					{:else}
						<span class="text-wrap text-center">No requests to display</span>
					{/if}
				{/if}
			</div>
		</div>
		{#if campaignMode === 'campaigns'}
			{#if selectedCampaign}
				<div class="flex flex-col basis-3/4 truncate">
					<h2 class="h2 mb-2 text-secondary-500 text-center truncate">
						{selectedCampaign.campaign_name}
					</h2>
					<h4 class="h4 md:mb-8 mb-4 text-tertiary-500 text-center">
						Created by {selectedCampaign.owner_user?.username}
					</h4>
					<div class="flex md:flex-row flex-col flex-1">
						<div class="p-4 flex flex-col flex-1 items-center basis-1/2 gap-4 overflow-y-scroll">
							<h4 class="h4 text-tertiary-500">Campaign Members</h4>
							{#if selectedCampaign.users.length > 0}
								{#each selectedCampaign.users as user}
									<button class="p-2 flex flex-row justify-start gap-1 rounded-lg truncate">
										<Avatar
											src="{PUBLIC_CLOUDINARY_BASE_URL}{user.profile_pic_url}"
											alt="Profile Picture for {user.username}"
											rounded="rounded-full"
											background="bg-transparent"
											width="w-8"
											height="h-8"
										/>
										<h4 class="h4 truncate">{user.username}</h4>
									</button>
								{/each}
							{:else}
								<span class="text-wrap text-center">This campaign has no members</span>
							{/if}
						</div>
						<span class="divider-vertical my-auto h-[95%] md:block hidden" />
						<div
							class="p-4 flex flex-col md:items-end items-center md:text-end text-center basis-1/2"
						>
							<div class="flex flex-col gap-4 md:mb-0 mb-12">
								<h4 class="h4 text-tertiary-500">Campaign Members</h4>
								<span>{selectedCampaign.campaign_description ?? 'No description available'}</span>
							</div>
							<a class="mt-auto" href="/campaigns/{selectedCampaign.id}">
								<button class="btn variant-filled-secondary">View Campaign</button>
							</a>
						</div>
					</div>
				</div>
			{:else}
				<span class="my-auto flex flex-col basis-3/4 text-wrap text-center">
					You aren't in any campaigns
				</span>
			{/if}
		{:else if campaignMode === 'requested_campaigns'}
			{#if selectedCampaign}
				<div class="flex flex-col basis-3/4 truncate">
					<h2 class="h2 mb-2 text-secondary-500 text-center truncate">
						{selectedCampaign.campaign_name}
					</h2>
					<h4 class="h4 md:mb-8 mb-4 text-tertiary-500 text-center">
						Created by {selectedCampaign.owner_user?.username}
					</h4>
					<div class="flex md:flex-row flex-col flex-1">
						<div class="p-4 flex flex-col flex-1 items-center basis-1/2 gap-4 overflow-y-scroll">
							<h4 class="h4 text-tertiary-500">Campaign Members</h4>
							{#if selectedCampaign.users.length > 0}
								{#each selectedCampaign.users as user}
									<button class="p-2 flex flex-row justify-start gap-1 rounded-lg truncate">
										<Avatar
											src="{PUBLIC_CLOUDINARY_BASE_URL}{user.profile_pic_url}"
											alt="Profile Picture for {user.username}"
											rounded="rounded-full"
											background="bg-transparent"
											width="w-8"
											height="h-8"
										/>
										<h4 class="h4 truncate">{user.username}</h4>
									</button>
								{/each}
							{:else}
								<span class="text-wrap text-center">This campaign has no members</span>
							{/if}
						</div>
						<span class="divider-vertical my-auto h-[95%] md:block hidden" />
						<div
							class="p-4 flex flex-col md:items-end items-center md:text-end text-center basis-1/2"
						>
							<div class="flex flex-col gap-4">
								<h4 class="h4 text-tertiary-500">Campaign Members</h4>
								<span>{selectedCampaign.campaign_description ?? 'No description available'}</span>
							</div>
							<a class="mt-auto" href="/campaigns/{selectedCampaign.id}">
								<button class="btn variant-filled-secondary">View Campaign</button>
							</a>
						</div>
					</div>
				</div>
			{:else}
				<span class="my-auto flex flex-col basis-3/4 text-wrap text-center">
					You haven't been requested to join any campaigns
				</span>
			{/if}
		{/if}
	</div>
</PageBlock>
