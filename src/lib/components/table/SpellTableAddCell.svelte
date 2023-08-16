<script lang="ts">
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	import AddSpellModal from '../modals/AddSpellModal.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus } from '@steeze-ui/heroicons';

	export let data;
	export let spellId: any;

	const modalComponent: ModalComponent = {
		ref: AddSpellModal,
		props: { data, spellId }
	};

	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		title: 'Add to Spellbook'
	};

	const modalAddSpell = () => {
		modalStore.trigger(modal);
	};
</script>

<button class="w-full flex justify-center items-center" on:click={modalAddSpell}>
	<Icon src={Plus} mini size="20" />
</button>
