<script lang="ts">
	import { enhance } from '$app/forms';
	import { Icon } from '@steeze-ui/svelte-icon';
	import {
		Home,
		BookOpen,
		Sparkles,
		Cog8Tooth,
		UserCircle,
		ArrowLeftOnRectangle
	} from '@steeze-ui/heroicons';

	const listClasses = 'rounded-full bg-primary-500';
</script>

<div class="w-56 h-[calc(100%-4rem)] m-8 flex flex-col items-center">
	<div class="space-y-4">
		<ul class={listClasses}>
			<a href="/" class="w-56 h-16 px-6 flex items-center justify-between">
				<Icon src={Home} theme="mini" size="40px" />
				<h4 class="h4">Dashboard</h4>
			</a>
		</ul>
	</div>
	<div class="mt-8 space-y-4">
		<ul class={listClasses}>
			<a href="/spellbooks" class="w-56 h-16 px-6 flex items-center justify-between">
				<Icon src={BookOpen} theme="mini" size="40px" />
				<h4 class="h4">Spellbooks</h4>
			</a>
		</ul>
		<ul class={listClasses}>
			<a href="/spells" class="w-56 h-16 px-6 flex items-center justify-between">
				<Icon src={Sparkles} theme="mini" size="40px" />
				<h4 class="h4">Spells</h4>
			</a>
		</ul>
	</div>
	<div class="mt-auto space-y-4">
		<ul class={listClasses}>
			<a href="/settings" class="w-56 h-16 px-6 flex items-center justify-between">
				<Icon src={Cog8Tooth} theme="mini" size="40px" />
				<h4 class="h4">Settings</h4>
			</a>
		</ul>
		<ul class={listClasses}>
			<a href="/profile" class="w-56 h-16 px-6 flex items-center justify-between">
				<Icon src={UserCircle} theme="mini" size="40px" />
				<h4 class="h4">Profile</h4>
			</a>
		</ul>
		<ul class={listClasses}>
			<form
				method="POST"
				action="/logout"
				class="w-56 h-16 px-6 flex items-center justify-between"
				use:enhance
			>
				<button type="submit" value="Sign out">
					<Icon src={ArrowLeftOnRectangle} theme="mini" size="40px" />
				</button>
				<h4 class="h4">Log Out</h4>
			</form>
		</ul>
	</div>
</div>
