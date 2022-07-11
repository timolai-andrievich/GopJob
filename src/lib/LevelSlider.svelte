<script lang="ts">
	import { createEventDispatcher } from 'svelte/internal';
	import { base } from '$app/paths';

	const dispatch = createEventDispatcher();
	let expanded = false;
	export let values;

	function createUpdatedEvent() {
		values.levelSliderText = levelMap.get(values.levelSlider);
		dispatch('updated', {});
	}
	const levelMap: Map<number, string> = new Map<number, string>([
		[0, 'Internship'],
		[1, 'Entry Level'],
		[2, 'Mid Level'],
		[3, 'Senior Level']
	]);
	values.levelSliderText = levelMap.get(values.levelSlider);
</script>

<div class="level-filter">
	<div on:click={(e) => (expanded = !expanded)} class="header">
		<div>Skill Level</div>
		<img
			class="expand-button"
			src="{base}/expand.png"
			alt={expanded ? 'Fold' : 'Expand'}
			style="transform:scaleY({expanded ? -1 : 1})"
		/>
	</div>
	{#if expanded}
		<div id="level-slider">
			{levelMap.get(values.levelSlider)}
			<input
				type="range"
				min="0"
				max="3"
				bind:value={values.levelSlider}
				on:change|preventDefault={createUpdatedEvent}
			/>
		</div>
	{/if}
</div>

<style>
	#level-slider {
		display: flex;
		flex-direction: column;
		margin-left: 1vw;
	}
	.expand-button {
		margin: 1vh;
		height: 2vh;
		transition: 250ms;
	}
	.expand-button:hover {
		margin: 0.5vh;
		height: 3vh;
	}
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		user-select: none;
	}
	.level-filter {
		margin-top: 1vh;
		margin-bottom: 1vh;
		padding: 2vmin;
		background-color: #d5d7df;
		border-radius: 2vmin;
	}
</style>
