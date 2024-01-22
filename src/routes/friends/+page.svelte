<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';

	export let data;
	const friendsData = data.friendsItem;

	console.log(friendsData);
</script>

<svelte:head>
	<title>Cauldron | Friends</title>
</svelte:head>
<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Friends</h1>
	<div class="flex flex-col items-center gap-10">
		{#each friendsData.friends as friend}
			<span>{friend.username}</span>
		{/each}
	</div>
</PageBlock>
