<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { FriendModalTypeEnum } from '$lib/types/friend-modal-type.enum';
	import type { User } from '@prisma/client';
	import type { User as LuciaUser } from 'lucia';

	export let type: FriendModalTypeEnum;
	export let userData: LuciaUser;
	export let requestedFriendData: User;
	export let friendData: User;

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	const getButtonLabel = () => {
		switch (type) {
			case FriendModalTypeEnum.accept:
				return 'Accept';
			case FriendModalTypeEnum.remove:
				return 'Remove';
			case FriendModalTypeEnum.decline:
				return 'Decline';
			case FriendModalTypeEnum.revoke:
				return 'Revoke';
		}
	};

	const handleSubmit = async (type: FriendModalTypeEnum) => {
		modalStore.close();
		switch (type) {
			case FriendModalTypeEnum.remove:
				const removeRes = await fetch(
					`/api/friends/remove
					?user_id=${userData.userId}
					&friend_id=${friendData.id}`,
					{
						method: 'POST'
					}
				);
				const friendRemoveRes = await fetch(
					`/api/friends/remove
					?user_id=${friendData.id}
					&friend_id=${userData.userId}`,
					{
						method: 'POST'
					}
				);
				if (!removeRes.ok || !friendRemoveRes.ok) {
					const data = await removeRes.json();
					const toastRemoveFriendFail: ToastSettings = {
						message: `Error: ${data.message}`,
						background: 'variant-filled-error'
					};
					toastStore.trigger(toastRemoveFriendFail);
				} else {
					const toastRemoveFriendSuccess: ToastSettings = {
						message: `Successfully removed friend`,
						background: 'variant-filled-success'
					};
					toastStore.trigger(toastRemoveFriendSuccess);
				}
				invalidateAll();
				break;
			case FriendModalTypeEnum.accept:
				const requestDeleteRes = await fetch(
					`/api/requestedFriends/remove
					?user_id=${userData.userId}
					&requested_friend_id=${requestedFriendData.id}`,
					{
						method: 'POST'
					}
				);
				const sentRequestDeleteRes = await fetch(
					`/api/sentRequests/remove
					?user_id=${requestedFriendData.id}
					&sent_request_id=${userData.userId}`,
					{
						method: 'POST'
					}
				);
				const friendRequestDeleteRes = await fetch(
					`/api/requestedFriends/remove
					?user_id=${requestedFriendData.id}
					&requested_friend_id=${userData.userId}`,
					{
						method: 'POST'
					}
				);
				const acceptRes = await fetch(
					`/api/friends/add
					?user_id=${userData.userId}
					&friend_id=${requestedFriendData.id}`,
					{
						method: 'POST'
					}
				);
				const friendAcceptRes = await fetch(
					`/api/friends/add
					?user_id=${requestedFriendData.id}
					&friend_id=${userData.userId}`,
					{
						method: 'POST'
					}
				);
				if (
					!requestDeleteRes.ok ||
					!acceptRes.ok ||
					!friendRequestDeleteRes.ok ||
					!friendAcceptRes.ok ||
					!sentRequestDeleteRes.ok
				) {
					const data = await acceptRes.json();
					const toastAcceptRequestFail: ToastSettings = {
						message: `Error: ${data.message}`,
						background: 'variant-filled-error'
					};
					toastStore.trigger(toastAcceptRequestFail);
				} else {
					const toastAcceptRequestSuccess: ToastSettings = {
						message: `Friend request from ${requestedFriendData.username} accepted`,
						background: 'variant-filled-success'
					};
					toastStore.trigger(toastAcceptRequestSuccess);
				}
				invalidateAll();
				break;
			case FriendModalTypeEnum.decline:
				const declineRes = await fetch(
					`/api/requestedFriends/remove
					?user_id=${userData.userId}
					&requested_friend_id=${requestedFriendData.id}`,
					{
						method: 'POST'
					}
				);
				const friendDeclineRes = await fetch(
					`/api/requestedFriends/remove
					?user_id=${requestedFriendData.id}
					&requested_friend_id=${userData.userId}`,
					{
						method: 'POST'
					}
				);
				if (!declineRes.ok || !friendDeclineRes.ok) {
					const data = await declineRes.json();
					const toastDeclineRequestFail: ToastSettings = {
						message: `Error: ${data.message}`,
						background: 'variant-filled-error'
					};
					toastStore.trigger(toastDeclineRequestFail);
				} else {
					const toastDeclineRequestSuccess: ToastSettings = {
						message: `Friend request from ${requestedFriendData.username} declined`,
						background: 'variant-filled-success'
					};
					toastStore.trigger(toastDeclineRequestSuccess);
				}
				invalidateAll();
				break;
			case FriendModalTypeEnum.revoke:
				const sentRequestRevokeRes = await fetch(
					`/api/sentRequests/remove
					?user_id=${requestedFriendData.id}
					&sent_request_id=${userData.userId}`,
					{
						method: 'POST'
					}
				);
				const revokeRes = await fetch(
					`/api/requestedFriends/remove
					?user_id=${userData.userId}
					&requested_friend_id=${requestedFriendData.id}`,
					{
						method: 'POST'
					}
				);
				const friendRevokeRes = await fetch(
					`/api/requestedFriends/remove
					?user_id=${requestedFriendData.id}
					&requested_friend_id=${userData.userId}`,
					{
						method: 'POST'
					}
				);
				if (!sentRequestRevokeRes.ok || !revokeRes.ok || !friendRevokeRes.ok) {
					const data = await revokeRes.json();
					const toastDeclineRequestFail: ToastSettings = {
						message: `Error: ${data.message}`,
						background: 'variant-filled-error'
					};
					toastStore.trigger(toastDeclineRequestFail);
				} else {
					const toastDeclineRequestSuccess: ToastSettings = {
						message: `Friend request to ${requestedFriendData.username} revoked`,
						background: 'variant-filled-success'
					};
					toastStore.trigger(toastDeclineRequestSuccess);
				}
				invalidateAll();
				break;
		}
	};
</script>

{#if $modalStore[0]}
	<div class="card p-8 w-modal-slim shadow-xl">
		<header class="text-2xl font-bold text-primary-500">
			<h3 class="h3 mb-2">{$modalStore[0].title}?</h3>
			<h3 class="h4 mb-8 text-secondary-500">
				{friendData?.username ?? requestedFriendData?.username}
			</h3>
		</header>
		<footer class="flex justify-start">
			<button class="mr-2 btn variant-filled-secondary" on:click={() => modalStore.close()}>
				Cancel
			</button>
			<button
				class="btn"
				class:variant-filled-error={type !== FriendModalTypeEnum.accept}
				class:variant-filled-success={type === FriendModalTypeEnum.accept}
				on:click|preventDefault={() => handleSubmit(type)}
			>
				{getButtonLabel()}
			</button>
		</footer>
	</div>
{/if}
