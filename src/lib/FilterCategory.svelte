<script lang="ts">
	import Filter from '$lib/Filter.svelte';
	import { categories } from '$lib/FilterConsts.js';

	export let updateFunction: Function;
</script>

<Filter filterClassname="filter-category" filterHeader="Choose category:" selectType="select-list">
	{#each categories as category}
		<li on:click={(event) => updateFunction('category', event.target)} class="category">
			{category}
		</li>
	{/each}
</Filter>
