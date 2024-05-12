<script lang="ts">
	import { PUBLIC_CLOUDINARY_BASE_URL } from '$env/static/public';
	import { createEventDispatcher, onMount } from 'svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { CampaignWithUserFields } from '$lib/types/campaign-with-user-fields.type';

	export let campaignData: CampaignWithUserFields[];
	export let noCampaignText: string;

	onMount(() => {
		console.log('hit', campaignData);
	});

	const dispatch = createEventDispatcher();
	const changeSelectedCampaign = (campaign: CampaignWithUserFields) => {
		dispatch('selectedCampaignChanged', {
			campaign: campaign
		});
	};
</script>

{#if campaignData?.length > 0}
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
	<span class="text-wrap text-center">{noCampaignText}</span>
{/if}
