<script lang="ts">
	import type { Cards } from '$lib/types';

	export let card: Cards;
</script>

<div class="card w-96 bg-white dark:bg-base-100 shadow-xl">
	<figure class="px-10 pt-10">
		<img src={card.src} alt="Shoes" class="rounded-xl" />
	</figure>
	<div class="card-body items-center text-center">
		<h2 class="card-title">{card.title}</h2>
		<p>{card.description}</p>
		<p />
		<div class="card-actions">
			<button class="btn btn-primary"> <a href={card.link}>Explore More</a></button>
		</div>
	</div>
</div>
