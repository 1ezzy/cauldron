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
</script>

<div class="w-16 h-[calc(100%-4rem)] m-8 flex flex-col items-center gap-8">
	<ul class="rounded-full bg-primary-500">
		<a href="/" class="w-16 h-16 flex flex-col items-center justify-center"
			><Icon src={Home} theme="mini" size="40px" /></a
		>
	</ul>
	<ul class="rounded-full bg-primary-500">
		<a href="/spellbooks" class="w-16 h-16 flex flex-col items-center justify-center"
			><Icon src={BookOpen} theme="mini" size="40px" /></a
		>
		<a href="/spells" class="w-16 h-16 flex flex-col items-center justify-center"
			><Icon src={Sparkles} theme="mini" size="40px" /></a
		>
	</ul>
	<ul class="mt-auto bg-primary-500 rounded-full">
		<a href="/settings" class="w-16 h-16 flex flex-col items-center justify-center"
			><Icon src={Cog8Tooth} theme="mini" size="40px" /></a
		>
		<a href="/profile" class="w-16 h-16 flex flex-col items-center justify-center"
			><Icon src={UserCircle} theme="mini" size="40px" /></a
		>
		<form
			method="POST"
			action="/logout"
			class="w-16 h-16 flex flex-col items-center justify-center"
			use:enhance
		>
			<button type="submit" value="Sign out">
				<Icon src={ArrowLeftOnRectangle} theme="mini" size="40px" />
			</button>
		</form>
	</ul>
</div>
