<script lang="ts">
	import '../app.postcss';

	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { capitalizeFirstLetter } from '$lib/utils/string-utils';
	import { AppShell, Modal, Toast, initializeStores, storePopup } from '@skeletonlabs/skeleton';
	import HeaderDrawer from '$lib/components/HeaderDrawer.svelte';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	initializeStores();

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	// $: pageTitle = convertUrlToPageTitle($page.url.pathname);
	// const convertUrlToPageTitle = (url: string): string => {
	// 	const parsedUrl = url.split('/');
	// 	const unformattedPageName = parsedUrl[parsedUrl.length - 1].split('-');
	// 	const formattedPageName = unformattedPageName.map((word) => {
	// 		return capitalizeFirstLetter(word);
	// 	});
	// 	const pageName = formattedPageName.join(' ');
	// 	return pageName === '' ? 'Cauldron | Dashboard' : `Cauldron | ${pageName}`;
	// };

	export let data;
	$: isActive = data.user !== null;
</script>

<svelte:head>
	<title>Cauldron</title>
</svelte:head>
<Modal />
<HeaderDrawer />
<Toast position="tr" />
{#if isActive}
	<AppShell slotSidebarLeft="bg-surface-100 dark:bg-surface-800">
		<svelte:fragment slot="header"><Header /></svelte:fragment>
		<svelte:fragment slot="sidebarLeft"><Sidebar userId={data.user?.id} /></svelte:fragment>
		<!-- Router Slot -->
		<slot />
		<!-- ---- / ---- -->
	</AppShell>
{:else}
	<slot />
{/if}
