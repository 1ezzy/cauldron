<script lang="ts">
	import { PUBLIC_CLOUDINARY_BASE_URL } from '$env/static/public';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import FriendModal from '$lib/components/modals/FriendModal.svelte';
	import { FriendModalTypeEnum } from '$lib/types/friend-modal-type.enum.js';
	import { Avatar, Tab, TabGroup, getModalStore } from '@skeletonlabs/skeleton';

	export let data;
	$: userData = data.user;
	$: friendsData = data.friendsItem;
	$: requestedFriendsData = data.requestedFriendsItem;

	let tabSet: number = 0;

	const modalStore = getModalStore();

	const modalFriendUpdate = (
		type: FriendModalTypeEnum,
		userData: any,
		requestedFriendData?: any,
		friendData?: any
	) => {
		modalStore.trigger({
			type: 'component',
			component: {
				ref: FriendModal,
				props: { type, userData, requestedFriendData, friendData }
			},
			title: type
		});
	};

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
	<title>Cauldron | Friends</title>
</svelte:head>
<PageBlock>
	<div class="mb-8 w-full flex flex-row items-center">
		<div />
		<h1 class="h1 text-primary-500 self-center mx-auto">Friends</h1>
		<a href="/friends/add" class="mr-8">
			<button class="btn variant-filled-primary"> Add Friend </button>
		</a>
	</div>

	<div class="w-full px-12 py-8 flex flex-1">
		<TabGroup class="w-full flex flex-col">
			<Tab bind:group={tabSet} name="friends" value={0}>Friends</Tab>
			<Tab bind:group={tabSet} name="pending" value={1}>Pending Friends</Tab>
			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					{#if friendsData.friends}
						<div
							class={`my-auto grid ${
								gridSizes[Math.min(6, friendsData.friends?.length)]
							} justify-items-center gap-8`}
						>
							{#each friendsData.friends as friend}
								<div class="card flex flex-col w-44 h-80">
									<header class="card-header text-center">
										<a href="/users/{friend.id}" class="h3 mb-4 text-primary-500"
											>{friend.username}</a
										>
									</header>

									<div class="p-4 flex flex-col flex-1 gap-4 items-center">
										<Avatar
											src="{PUBLIC_CLOUDINARY_BASE_URL}{friend.profile_pic_url}"
											alt="Profile Picture for {friend.username}"
											rounded="rounded-full"
											width="w-16"
										/>
										<div class="mt-auto flex flex-col gap-2">
											<a href="/users/{friend.id}" class="btn variant-filled-tertiary"
												>View Profile</a
											>
											<button
												class="btn variant-filled-error"
												on:click={() => {
													modalFriendUpdate(FriendModalTypeEnum.remove, userData, null, friend);
												}}
											>
												Remove
											</button>
										</div>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<span class="mx-auto my-auto">No friends to show</span>
					{/if}
				{:else if tabSet === 1}
					{#if requestedFriendsData.friends}
						<div
							class={`my-auto grid ${
								gridSizes[Math.min(6, requestedFriendsData.requested_friends.length)]
							} justify-items-center gap-8`}
						>
							{#each requestedFriendsData.requested_friends as friend}
								<div class="card flex flex-col w-44 h-80">
									<header class="card-header text-center">
										<a href="/users/{friend.id}" class="h3 mb-4 text-primary-500"
											>{friend.username}</a
										>
									</header>
									<div class="p-4 flex flex-col flex-1 gap-4 items-center">
										<Avatar
											src="{PUBLIC_CLOUDINARY_BASE_URL}{friend.profile_pic_url}"
											alt="Profile Picture for {friend.username}"
											rounded="rounded-full"
											width="w-16"
										/>
										<div class="mt-auto flex flex-col gap-2">
											<a href="/users/{friend.id}" class="btn variant-filled-tertiary"
												>View Profile</a
											>
											{#if friend.sent_requests_ids?.includes(friend.id)}
												<button
													class="btn variant-filled-success"
													on:click={() => {
														modalFriendUpdate(FriendModalTypeEnum.accept, userData, friend);
													}}
												>
													Accept
												</button>
												<button
													class="btn variant-filled-error"
													on:click={() => {
														modalFriendUpdate(FriendModalTypeEnum.decline, userData, friend);
													}}
												>
													Decline
												</button>
											{:else}
												<button
													class="btn variant-filled-error"
													on:click={() => {
														modalFriendUpdate(FriendModalTypeEnum.revoke, userData, friend);
													}}
												>
													Revoke
												</button>
											{/if}
										</div>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<span class="mx-auto my-auto">No requested friends to show</span>
					{/if}
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</PageBlock>
