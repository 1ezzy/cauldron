<script lang="ts">
	import { PUBLIC_CLOUDINARY_BASE_URL } from '$env/static/public';
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { CampaignWithUserFields } from '$lib/types/campaign-with-user-fields.type';

	export let selectedCampaign: CampaignWithUserFields;
</script>

<div class="flex flex-col basis-3/4 gap-4">
	<h2 class="h2 text-secondary-500 text-center truncate">
		{selectedCampaign.campaign_name}
	</h2>
	<h4 class="h4 text-tertiary-500 text-center">
		Created by {selectedCampaign.owner_user?.username}
	</h4>
	<div class="flex md:flex-row flex-col flex-1 truncate">
		<div class="p-4 flex flex-col flex-1 items-start basis-1/2 gap-4 overflow-y-scroll">
			<h4 class="h4 text-tertiary-500">Campaign Members</h4>
			{#if selectedCampaign.users?.length > 0}
				{#each selectedCampaign.users as user}
					<button class="py-2 flex flex-row gap-3 rounded-lg truncate">
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
		<div class="p-4 flex flex-col md:items-end items-center md:text-end text-center basis-1/2">
			<div class="flex flex-col gap-4 md:mb-0 mb-12">
				<h4 class="h4 text-tertiary-500">Campaign Description</h4>
				<span>{selectedCampaign.campaign_description ?? 'No description available'}</span>
			</div>
			<slot />
		</div>
	</div>
</div>
