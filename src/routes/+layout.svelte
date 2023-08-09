<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import type { PageData } from './$types';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';

	export let data: PageData;
</script>

{#if data.session}
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
