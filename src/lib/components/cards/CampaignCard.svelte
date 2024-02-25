<script lang="ts">
	import type { Campaign } from '@prisma/client';

	export let campaign: Campaign;
	export let ownerUsername: string;
</script>

<div
	class="card h-96 w-72 md:w-60 p-4 flex flex-col items-center bg-gradient-to-br variant-gradient-primary-secondary"
>
	<header class="card-header w-72 md:w-60 mb-2 text-xl text-center">
		<p class="text-xl font-bold truncate">{campaign.campaign_name}</p>
		<p class="text-lg truncate">Created By</p>
		<p class="text-lg truncate">
			{ownerUsername}
		</p>
	</header>
	<hr class="w-full !border-t-2 my-1" />
	<section class="mt-2 px-4 line-clamp">
		{campaign.campaign_description ?? 'No description'}
	</section>
	<footer class="card-footer mt-auto">
		<a href="/campaigns/{campaign.id}">
			<button class="btn variant-filled-tertiary">Open Campaign</button>
		</a>
	</footer>
</div>

<style lang="postcss">
	.line-clamp {
		width: 100%;
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 6;
	}
</style>
