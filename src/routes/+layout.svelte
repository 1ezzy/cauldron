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

<section class="flex h-[100vh] items-center justify-center">
	{@render children()}
</section>
