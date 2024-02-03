<script lang="ts">
	import { slide } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { Icon } from '@steeze-ui/svelte-icon';
	import {
		Home,
		BookOpen,
		Sparkles,
		Cog8Tooth,
		UserCircle,
		ArrowLeftOnRectangle,
		ChevronDoubleLeft,
		ChevronDoubleRight,
		UserGroup,
		Users
	} from '@steeze-ui/heroicons';

	const listClasses = 'rounded-full bg-primary-500';
	const expandedAClasses = 'w-56 h-14 px-4 flex items-center justify-between';
	const AClasses = 'w-14 h-14 flex justify-center items-center';

	export let userId: string;
	let expanded: boolean = true;
</script>

<div
	class="h-[calc(100%-4rem)] m-8 hidden md:flex flex-col items-start relative transition-width ease-out"
	class:w-56={expanded}
	class:w-16={!expanded}
>
	<button
		class="absolute top-[-32px] right-[-30px]"
		on:click={() => {
			expanded = !expanded;
		}}
	>
		<Icon src={expanded ? ChevronDoubleLeft : ChevronDoubleRight} theme="mini" size="24px" />
	</button>
	<div class="space-y-4">
		<ul class={listClasses}>
			<a href="/" class={expanded ? expandedAClasses : AClasses}>
				<Icon src={Home} theme="mini" size="24px" />
				{#if expanded}
					<h4 class="h4" in:slide={{ axis: 'x' }}>Dashboard</h4>
				{/if}
			</a>
		</ul>
	</div>
	<div class="mt-10 space-y-4">
		<ul class={listClasses}>
			<a href="/spellbooks" class={expanded ? expandedAClasses : AClasses}>
				<Icon src={BookOpen} theme="mini" size="24px" />
				{#if expanded}
					<h4 class="h4" in:slide={{ delay: 50, axis: 'x' }}>Spellbooks</h4>
				{/if}
			</a>
		</ul>
		<ul class={listClasses}>
			<a href="/spells" class={expanded ? expandedAClasses : AClasses}>
				<Icon src={Sparkles} theme="mini" size="24px" />
				{#if expanded}
					<h4 class="h4" in:slide={{ delay: 100, axis: 'x' }}>Spells</h4>
				{/if}
			</a>
		</ul>
	</div>
	<!-- <div class="mt-10 space-y-4">
		<ul class={listClasses}>
			<a href="/characters" class={expanded ? expandedAClasses : AClasses}>
				<Icon src={UserGroup} theme="mini" size="24px" />
				{#if expanded}
					<h4 class="h4" in:slide={{ delay: 150, axis: 'x' }}>Characters</h4>
				{/if}
			</a>
		</ul>
	</div> -->
	<div class="mt-auto space-y-4">
		<!-- <ul class={listClasses}>
			<a href="/settings" class="w-56 h-14 px-4 flex items-center justify-between">
				<Icon src={Cog8Tooth} theme="mini" size="24px" />
				<h4 class="h4">Settings</h4>
			</a>
		</ul> -->
		<ul class={listClasses}>
			<a href="/friends" class={expanded ? expandedAClasses : AClasses}>
				<Icon src={Users} theme="mini" size="24px" />
				{#if expanded}
					<h4 class="h4" in:slide={{ delay: 100, axis: 'x' }}>Friends</h4>
				{/if}
			</a>
		</ul>
		<ul class={listClasses}>
			<a href="/users/{userId}" class={expanded ? expandedAClasses : AClasses}>
				<Icon src={UserCircle} theme="mini" size="24px" />
				{#if expanded}
					<h4 class="h4" in:slide={{ delay: 100, axis: 'x' }}>Profile</h4>
				{/if}
			</a>
		</ul>
		<ul class={listClasses}>
			<form method="POST" action="/logout" use:enhance>
				<button type="submit" value="Sign out" class={expanded ? expandedAClasses : AClasses}>
					<Icon src={ArrowLeftOnRectangle} theme="mini" size="24px" />
					{#if expanded}
						<h4 class="h4" in:slide={{ delay: 100, axis: 'x' }}>Logout</h4>
					{/if}
				</button>
			</form>
		</ul>
	</div>
</div>
