<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import type { User } from '@prisma/client';

	export let data;
	const profileData: User = data.profileItem;
</script>

<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Profile</h1>
	<div class="flex flex-col items-center">
		<div class="mb-8 text-center">
			<h3 class="h3 mb-2 text-tertiary-500">Username</h3>
			<h4 class="h4">{profileData?.username}</h4>
		</div>
		<div class="mb-8 text-center">
			<h3 class="h3 mb-2 text-tertiary-500">Account Created</h3>
			<h4 class="h4">{new Date(profileData?.created_at).toDateString()}</h4>
		</div>
	</div>
</PageBlock>
