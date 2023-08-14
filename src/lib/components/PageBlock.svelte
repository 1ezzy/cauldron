<script lang="ts">
	export let styles: string = '';
</script>

<div class="container h-full mx-auto p-10 flex flex-col justify-start items-center {styles}">
	<slot />
</div>
