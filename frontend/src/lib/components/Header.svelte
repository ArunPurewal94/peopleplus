<script lang="ts">
	import { onMount } from 'svelte';
	import {applyAction, enhance} from '$app/forms'
	import Logo from '../svgs/Logo.svelte';
	import { currentUser, pb } from '../pocketbase';
	let dark: boolean;
	let hidden = true;
	onMount(() => {
		dark = document.documentElement.classList.contains('dark');
		hidden = false;
		const matcher = window.matchMedia('(prefers-color-scheme: dark)');
		matcher.addEventListener('change', handleChange);
		return () => matcher.removeEventListener('change', handleChange);
	});
	function handleChange({ matches: dark }: MediaQueryListEvent) {
		if (!localStorage.theme) {
			setMode(dark);
		}
	}
	function toggle() {
		setMode(!dark);
	}
	function setMode(value: boolean) {
		dark = value;
		if (dark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		localStorage.theme = dark ? 'dark' : 'light';
		if (window.matchMedia(`(prefers-color-scheme: ${localStorage.theme})`).matches) {
			localStorage.removeItem('theme');
		}
	}
</script>

<svelte:head>
	<script>
		if (
			localStorage.theme === 'dark' ||
			(!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	</script>
</svelte:head>

<div class="navbar bg-white dark:bg-base-100 shadow-xl z-50">
	<div class="navbar-start">
		<div class="dropdown">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<p tabindex="0" class="btn btn-ghost btn-circle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h7"
					/></svg
				>
			</p>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="menu menu-compact dropdown-content mt-3 p-2 border-2 bg-white dark:bg-base-200 rounded-box w-52"
			>
				<li><a href="/who-we-are">Who We Are</a></li>
				<li><a href="/work-for-us">Work For Us</a></li>
				<li><a href="/work-with-us">Work With Us</a></li>
				<li><a href="/courses">Courses</a></li>
				<li><a href="/latest-news">Latest News</a></li>
				<li><a href="/what-we-do">What We Do</a></li>
			</ul>
		</div>
	</div>
	<div class="navbar-center">
		<a href="/"><Logo /></a>
	</div>
	<div class="navbar-end">
		<div>
			{#if $currentUser}
		<form method="POST" action="/logout" use:enhance={() => {
			return async ({result}) => {
				pb.authStore.clear();
				await applyAction(result)
			}
		}}>
			<button type="submit">Logout</button>
		</form>
		{:else}
		<span><a href="/login">Login</a></span>
		<span><a href="/register">Register</a></span>
		{/if}
		</div>

		<button
			class="{dark
				? 'bg-gray-600 focus:ring-gray-400 ring-offset-gray-700'
				: 'bg-yellow-200 focus:ring-yellow-400 ring-offset-white'} relative btn-ghost inline-flex flex-shrink-0 h-5 w-9 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 m-4 shadow-xl"
			class:hidden
			on:click={toggle}
		>
			<span class="sr-only">Toggle Dark Mode</span>
			<span
				class="{dark
					? 'translate-x-0 bg-gray-300'
					: 'translate-x-4 bg-white'} pointer-events-none relative inline-block h-4 w-4 rounded-full shadow transform ring-0 transition ease-in-out duration-500"
			>
				<span
					class="{dark
						? 'opacity-100 ease-in duration-500'
						: 'opacity-0 ease-out duration-500'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
					aria-hidden="true"
				>
					<svg class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
						<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
					</svg>
				</span>
				<span
					class="{dark
						? 'opacity-0 ease-out duration-500'
						: 'opacity-100 ease-in duration-500'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
					aria-hidden="true"
				>
					<svg class="h-3 w-3 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
							clip-rule="evenodd"
						/>
					</svg>
				</span>
			</span>
		</button>
	</div>
</div>
