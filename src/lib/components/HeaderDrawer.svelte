<script lang="ts">
	import { Drawer } from '@skeletonlabs/skeleton';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import headerLogo from '$lib/assets/images/header-logo.png';

	const drawerStore = getDrawerStore();

	const closeDrawer = () => {
		drawerStore.close();
	};
</script>

<Drawer>
	<div class="h-full flex flex-col items-center justify-center space-y-8">
		<a
			class="w-fit text-xl text-primary-500"
			href="/"
			on:click={() => {
				closeDrawer();
			}}
			on:keydown={() => {
				closeDrawer();
			}}>Dashboard</a
		>
		<a
			class="w-fit text-xl text-primary-500"
			href="/spellbooks"
			on:click={() => {
				closeDrawer();
			}}
			on:keydown={() => {
				closeDrawer();
			}}>Spellbooks</a
		>
		<a
			class="w-fit text-xl text-primary-500"
			href="/spells"
			on:click={() => {
				closeDrawer();
			}}
			on:keydown={() => {
				closeDrawer();
			}}>Spells</a
		>
		<a
			class="w-fit text-xl text-primary-500"
			href="/profile"
			on:click={() => {
				closeDrawer();
			}}
			on:keydown={() => {
				closeDrawer();
			}}>Profile</a
		>
		<a href="//ezzy.dog">
			<img class="h-8" src={headerLogo} alt="header logo" />
		</a>
	</div>
</Drawer>
