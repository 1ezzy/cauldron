<script lang="ts">
	import { Button, Switch, ThemeSwitch } from 'svelte-ux';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';

	import './app.css';

	let { children } = $props();
</script>

<header class="relative flex h-16 w-full items-center justify-center">
	<div class="mx-auto flex justify-center gap-16 self-center">
		<a href="/">Home</a>
		<a href="/spellbooks">Spellbooks</a>
		<a href="/spells">Spells</a>
	</div>
	<div class="absolute top-1/2 right-8 flex -translate-x-1/2 -translate-y-1/2">
		<!-- <Button icon={{ data: faGithub, size: '32px' }} size="lg" color="danger"></Button> -->
		<ThemeSwitch />
	</div>
</header>

<section
	class="flex min-h-[calc(100vh-4rem)] flex-col justify-center px-8 py-16 md:items-center md:px-0 md:py-0"
>
	<div class="flex justify-center py-16 md:w-[70vw] md:flex-1">
		{@render children()}
	</div>
</section>
