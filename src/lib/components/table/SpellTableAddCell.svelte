<script lang="ts">
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus } from '@steeze-ui/heroicons';

	export let modal: ModalSettings;

	const modalAddSpell = () => {
		modalStore.trigger(modal);
	};
</script>

<button class="w-full flex justify-center items-center" on:click={modalAddSpell}>
	<Icon src={Plus} mini size="20" />
</button>
