<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { currentUser } from '$lib/pocketbase';
	import '../app.postcss';

</script>

<div class="min-h-screen bg-white dark:bg-base-100">
	<Header />

	<main class="p-5 z-50">
		<slot />
	</main>
</div>
