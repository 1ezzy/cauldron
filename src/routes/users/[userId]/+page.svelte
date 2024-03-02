<script lang="ts">
	import { PUBLIC_CLOUDINARY_BASE_URL } from '$env/static/public';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data;
	$: profileData = data.profileItem;
	$: userData = data.user;

	$: isUser = profileData?.username === userData?.username;
</script>

<svelte:head>
	<title>Cauldron | {profileData.username ?? null}</title>
</svelte:head>
<PageBlock>
	{#if isUser}
		<div class="w-full mb-8 flex flex-row items-center">
			<div class="basis-1/3" />
			<h1 class="h1 text-primary-500 text-center basis-1/3">Your Profile</h1>
			<div class="flex justify-end basis-1/3">
				<button class="btn variant-filled-primary">Edit Profile</button>
			</div>
		</div>
	{/if}
	<div class="w-full flex md:flex-row flex-col gap-8 mb-8">
		<div class="card p-4 basis-[40%]">
			<header class="card-header">
				<h1 class="h1 text-primary-500 text-center">{profileData.username}</h1>
			</header>
			<div class="px-4 py-8 flex flex-row justify-center">
				<Avatar
					src="{PUBLIC_CLOUDINARY_BASE_URL}{profileData.profile_pic_url}"
					alt="Profile Picture for {profileData.username}"
					rounded="rounded-full"
					background="bg-transparent"
					width="md:w-24 w-40"
				/>
			</div>
			<footer class="card-footer flex flex-row gap-2 justify-center">
				<h4 class="h4 text-secondary-500">User Since:</h4>
				<h4 class="h4">{new Date(profileData.created_at).toDateString()}</h4>
			</footer>
		</div>
		<div class="card p-4 basis-[60%]">
			<header class="card-header mb-4">
				<h3 class="h3 text-primary-500">About {profileData.username}</h3>
			</header>
			<div class="flex flex-col gap-8 p-4">
				<p class="flex-1">{profileData.biography ?? 'No information provided.'}</p>
			</div>
		</div>
	</div>
</PageBlock>
