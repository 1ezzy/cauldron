<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<section class="flex h-[100vh] items-center justify-center">
	{@render children()}
</section>
