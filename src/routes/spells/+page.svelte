<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { formatSpellLevel, stringToIndex } from '$lib/utils/string-utils';
	import { Paginate, Pagination, Table } from 'svelte-ux';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let spells = data.spellsItem;
</script>

<svelte:head>
	<title>Cauldron | Spells</title>
</svelte:head>
<PageBlock title="Spells" gapsize={'gap-8'}>
	<div class="flex flex-col items-center gap-2">
		{#each spells.splice(0, 10) as spell}{/each}
	</div>
	<div class="w-3/4">
		<Paginate data={spells} perPage={25} let:pageData let:pagination>
			<Table
				class="w-full"
				classes={{ td: 'py-1' }}
				data={pageData}
				columns={[
					{
						name: 'Name',
						value: 'name',
						align: 'left',
						html: true,
						format: (name: string) => {
							return `<a href="spells/${stringToIndex(name.toLowerCase())}">${name}</a>`;
						}
					},
					{
						name: 'Level',
						value: 'level',
						align: 'center',
						format: (level: number) => {
							return formatSpellLevel(level);
						}
					},
					{
						name: 'Casting Time',
						value: 'casting_time',
						align: 'center'
					},
					{
						name: 'School',
						value: 'school.name',
						align: 'center'
					},
					{
						name: 'Range',
						value: 'range',
						align: 'right'
					}
				]}
			/>
			<Pagination
				{pagination}
				perPageOptions={[5, 10, 25, 100]}
				show={['perPage', 'pagination', 'prevPage', 'nextPage']}
				classes={{ root: 'border-t py-1 mt-2', perPage: 'flex-1 text-right', pagination: 'px-8' }}
			/>
		</Paginate>
	</div>
</PageBlock>
