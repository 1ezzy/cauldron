<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import FriendModal from '$lib/components/modals/FriendModal.svelte';
	import { FriendModalTypeEnum } from '$lib/types/friend-modal-type.enum.js';
	import { getModalStore } from '@skeletonlabs/skeleton';

	export let data;
	const friendsData = data.friendsItem;
	const requestedFriendsData = data.requestedFriendsItem;

	const modalStore = getModalStore();

	const modalFriendUpdate = (type: FriendModalTypeEnum, userData: any) => {
		modalStore.trigger({
			type: 'component',
			component: {
				ref: FriendModal,
				props: { type, userData }
			},
			title: type
		});
	};
</script>

<svelte:head>
	<title>Cauldron | Friends</title>
</svelte:head>
<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Friends</h1>
	<div class="w-full flex flex-1">
		<div class="p-8 flex flex-col items-center basis-2/3">
			<h2 class="h2 mb-8 text-secondary-500">Your Friends</h2>
			<div class="flex flex-col items-center gap-10">
				{#each friendsData.friends as friend}
					<div class="card">
						<a href="/user/{friend.id}" class="h3 mb-4">{friend.username}</a>
						<div class="flex flex-col gap-2">
							<a href="/user/{friend.id}" class="btn variant-filled-tertiary">View Profile</a>
							<button
								class="btn variant-filled-error"
								on:click={() => {
									modalFriendUpdate(FriendModalTypeEnum.remove, friend);
								}}
							>
								Remove
							</button>
						</div>
					</div>
				{/each}
			</div>
			<a href="/friends/add" class="mt-auto">
				<button class="btn variant-filled-primary"> Add Friend </button>
			</a>
		</div>
		<span class="divider-vertical my-auto h-[95%] md:block hidden" />
		<div class="p-8 flex flex-col basis-1/3">
			<h2 class="h2 mb-8 text-secondary-500 text-center">Pending Friends</h2>
			<div class="flex flex-col items-center gap-10">
				{#each requestedFriendsData.requested_friends as friend}
					<div class="flex flex-col">
						<a href="/user/{friend.id}" class="h3 mb-4">{friend.username}</a>
						<div class="flex flex-col gap-2">
							<a href="/user/{friend.id}" class="btn variant-filled-tertiary">View Profile</a>
							<button
								class="btn variant-filled-success"
								on:click={() => {
									modalFriendUpdate(FriendModalTypeEnum.accept, friend);
								}}
							>
								Accept
							</button>
							<button
								class="btn variant-filled-error"
								on:click={() => {
									modalFriendUpdate(FriendModalTypeEnum.decline, friend);
								}}
							>
								Decline
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</PageBlock>
