<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import CampaignCard from '$lib/components/CampaignCard.svelte';
	import type { Campaign } from '@prisma/client';

	export let data;

	let campaignData: Campaign[] = data.campaignsItem;
	let ownerUsername = data.ownerUsername;

	const gridSizes: { [key: number]: string } = {
		1: 'grid-cols-1',
		2: 'md:grid-cols-2 grid-cols-1',
		3: 'lg:grid-cols-3 md:grid-cols-2 grid-cols-1',
		4: 'xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1',
		5: 'xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1',
		6: 'xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1'
	};
</script>

<svelte:head>
	<title>Cauldron | Campaigns</title>
</svelte:head>
<PageBlock>
	<div class="w-full mb-8 flex flex-row items-center">
		<div class="basis-1/3" />
		<h1 class="h1 text-primary-500 text-center basis-1/3">Campaigns</h1>
		<a href="/campaigns/create" class="flex justify-end basis-1/3">
			<button class="btn variant-filled-primary">Create a Campaign</button>
		</a>
	</div>
	{#if campaignData.length > 0}
		<div class={`my-auto grid ${gridSizes[Math.min(6, campaignData.length)]} gap-8`}>
			{#each campaignData as campaign}
				<CampaignCard {campaign} {ownerUsername} />
			{/each}
		</div>
	{:else}
		<span class="my-auto">No spellbooks to display</span>
	{/if}
</PageBlock>
