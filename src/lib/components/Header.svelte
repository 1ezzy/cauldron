<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import headerLogo from '$lib/assets/images/header-logo.png';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowLeftOnRectangle, Bars3 } from '@steeze-ui/heroicons';
	import { enhance } from '$app/forms';

	const drawerStore = getDrawerStore();

	const triggerDrawer = () => {
		drawerStore.open({ position: 'top', height: 'h-auto' });
	};
</script>

<nav
	class="h-16 md:px-12 px-4 py-4 bg-surface-100 dark:bg-surface-800 flex justify-between items-center border-solid border-b-2 border-surface-200 dark:border-surface-700"
>
	<div
		class="md:hidden flex"
		on:click={() => {
			triggerDrawer();
		}}
		on:keydown={() => {
			triggerDrawer();
		}}
		role="menu"
		tabindex={0}
	>
		<Icon src={Bars3} theme="solid" class="h-8 bg-surface-800" />
	</div>
	<a href="//ezzy.dog" class="md:flex hidden">
		<img class="h-8" src={headerLogo} alt="header logo" />
	</a>
	<div class="flex gap-4 items-center">
		<LightSwitch />
		<form class="md:hidden flex" method="POST" action="/logout" use:enhance>
			<button type="submit" value="Sign out">
				<Icon src={ArrowLeftOnRectangle} theme="mini" size="32px" />
			</button>
		</form>
	</div>
</nav>
