<script lang="ts">
	import { Drawer } from '@skeletonlabs/skeleton';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	const closeDrawer = () => {
		drawerStore.close();
	};
</script>

<Drawer>
	<div class="h-full flex flex-col items-center justify-center space-y-8">
		<a
			class="w-fit text-xl"
			href="/"
			on:click={() => {
				closeDrawer();
			}}
			on:keydown={() => {
				closeDrawer();
			}}>Dashboard</a
		>
		<a
			class="w-fit text-xl"
			href="/spellbooks"
			on:click={() => {
				closeDrawer();
			}}
			on:keydown={() => {
				closeDrawer();
			}}>Spellbooks</a
		>
		<a
			class="w-fit text-xl"
			href="/spells"
			on:click={() => {
				closeDrawer();
			}}
			on:keydown={() => {
				closeDrawer();
			}}>Spells</a
		>
		<a
			class="w-fit text-xl"
			href="/profile"
			on:click={() => {
				closeDrawer();
			}}
			on:keydown={() => {
				closeDrawer();
			}}>Profile</a
		>
	</div>
</Drawer>
