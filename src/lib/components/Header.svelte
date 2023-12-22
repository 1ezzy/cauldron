<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import headerLogo from '$lib/assets/header-logo.png';
</script>

<nav
	class="h-16 px-12 py-4 bg-surface-100 dark:bg-surface-800 flex justify-between items-center border-solid border-b-2 border-surface-200 dark:border-surface-700"
>
	<a href="//ezzy.dog"><img class="h-8" src={headerLogo} alt="header logo" /></a>
	<LightSwitch />
</nav>
