<script lang="ts">
	import { PUBLIC_CLOUDINARY_BASE_URL } from '$env/static/public';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data;
	const profileData = data.profileItem;
</script>

<svelte:head>
	<title>Cauldron | {profileData.username}</title>
</svelte:head>
<PageBlock>
	<div class="card w-full p-4">
		<header class="card-header">
			<h1 class="h1 text-primary-500">{profileData.username}</h1>
		</header>
		<div class="px-4 py-12 flex flex-row">
			<Avatar
				src="{PUBLIC_CLOUDINARY_BASE_URL}{profileData.profile_pic_url}"
				alt="Profile Picture for {profileData.username}"
				rounded="rounded-full"
				width="w-48"
			/>
			<span class="divider-vertical w-0 mx-8" />
			<p class="flex-1">{profileData.biography ?? 'No information provided.'}</p>
		</div>
		<footer class="card-footer flex flex-row gap-2 justify-start">
			<h4 class="h4 text-secondary-500">User Since:</h4>
			<h4 class="h4">{new Date(profileData.created_at).toDateString()}</h4>
		</footer>
	</div>
	<!-- <span class="divider-vertical my-auto h-48" />
	<div class="p-8 basis-1/3 flex flex-col">
		<h3 class="h3 mb-8 text-secondary-500">Edit account details</h3>
	</div> -->
</PageBlock>
