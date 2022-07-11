<script lang="ts">
	import Filter from '$lib/Filter.svelte';
	import { locations } from '$lib/FilterConsts.js';

	export let updateFunction: Function;
</script>

<Filter filterClassname="filter-location" filterHeader="City/Town:" selectType="select-list">
	{#each locations as location}
		<li on:click={(event) => updateFunction('location', event.target)} class="location">
			{location}
		</li>
	{/each}
</Filter>
