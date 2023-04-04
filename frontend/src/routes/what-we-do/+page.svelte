<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	let cards = [
		{
			title: 'Employer Support',
			src: 'https://peopleplus.co.uk/thumbs/600%C3%97400/pages/2021/09/1632406472_employers.jpg',
			description: 'Grow Your Business With Us',
			link: '/employer-support'
		},
		{
			title: 'Looking For a Job or Training?',
			src: 'https://peopleplus.co.uk/thumbs/600%C3%97400/pages/2021/09/Individual.jpg',
			description: 'Find Support To Enhance Your Career',
			link: '/jobs-and-training'
		},
		{
			title: 'Health & Social Care Support',
			src: 'https://peopleplus.co.uk/thumbs/600%C3%97400/pages/2021/09/1632407936_home-page-carers.jpg',
			description: '',
			link: '/health-social-care-support'
		}
	];
</script>

<h1 class="text-center text-2xl">What We Do</h1>
<div class="flex flex-wrap justify-between mt-2 items-center">
	{#each cards as card (card.title)}
		<Card {card} />
	{/each}
</div>
