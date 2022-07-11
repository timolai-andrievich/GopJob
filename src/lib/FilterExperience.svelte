<script lang="ts">
	import Filter from '$lib/Filter.svelte';

	export let updateFunction: Function;
</script>

<Filter filterClassname="filter-level" filterHeader="Experience:" selectType="select-radio">
	<li class="level radio-button" on:click={(event) => updateFunction('level', event.target)}>
		Entry Level
	</li>
	<li class="level radio-button" on:click={(event) => updateFunction('level', event.target)}>
		Mid Level
	</li>
	<li class="level radio-button" on:click={(event) => updateFunction('level', event.target)}>
		Senior Level
	</li>
	<li class="level radio-button" on:click={(event) => updateFunction('level', event.target)}>
		management
	</li>
	<li class="level radio-button" on:click={(event) => updateFunction('level', event.target)}>
		Internship
	</li>
</Filter>

<style>
	.radio-button {
		padding-left: 4vw;
		margin-left: 0 !important;
		text-align: left !important;
		border: none !important;
	}

	.radio-button:before {
		content: '';
		display: inline-block;
		background-color: #fff;
		width: 40px;
		height: 40px;
		margin-right: 15px;
		border-radius: 20px;
		top: 7px;
		position: relative;
		transition: all 0.2s ease;
	}

	.radio-button:hover:before {
		background-color: #838383;
		transition: all 0.2s ease;
	}
</style>
