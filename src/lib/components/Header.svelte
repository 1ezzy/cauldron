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
	<a href="https://ezzy.dog" class="md:flex hidden">
		<img class="h-8" src={headerLogo} alt="header logo" />
	</a>
	<div class="flex gap-4 items-center">
		<a href="https://github.com/1ezzy/cauldron" class="flex items-center">
			<svg
				aria-hidden="true"
				class="fill-black dark:fill-white"
				height="24"
				width="24"
				version="1.1"
				viewBox="0 0 16 16"
				><path
					fill-rule="evenodd"
					d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
				/>
			</svg>
		</a>
		<LightSwitch />
		<form class="md:hidden flex ml-2" method="POST" action="/logout" use:enhance>
			<button type="submit" value="Sign out">
				<Icon src={ArrowLeftOnRectangle} theme="mini" size="32px" />
			</button>
		</form>
	</div>
</nav>
