<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<header class="flex h-16 w-full items-center justify-center">
	<div class="mx-auto flex justify-center gap-16">
		<a href="/">Home</a>
		<a href="/spellbooks">Spellbooks</a>
		<a href="/spells">Spells</a>
	</div>
</header>

<section
	class="items:start flex min-h-[calc(100vh-4rem)] justify-center px-8 py-16 md:items-center md:px-0 md:py-0"
>
	<div class="flex justify-center md:min-h-[50vh] md:w-[50vh]">
		{@render children()}
	</div>
</section>
