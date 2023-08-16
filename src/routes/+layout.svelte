<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { capitalizeFirstLetter } from '$lib/utils/string-utils';
	import { AppShell, Modal } from '@skeletonlabs/skeleton';

	export let data: PageData;

	$: pageTitle = convertUrlToPageTitle($page.url.pathname);
	const convertUrlToPageTitle = (url: string): string => {
		const parsedUrl = url.split('/');
		const unformattedPageName = parsedUrl[parsedUrl.length - 1].split('-');
		const formattedPageName = unformattedPageName.map((word) => {
			return capitalizeFirstLetter(word);
		});
		const pageName = formattedPageName.join(' ');
		return pageName === '' ? 'Dashboard' : pageName;
	};
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

{#if data.session}
	<Modal />
	<AppShell>
		<svelte:fragment slot="header"><Header /></svelte:fragment>
		<svelte:fragment slot="sidebarLeft"><Sidebar /></svelte:fragment>
		<!-- Router Slot -->
		<slot />
		<!-- ---- / ---- -->
	</AppShell>
{:else if !data.session}
	<slot />
{/if}
