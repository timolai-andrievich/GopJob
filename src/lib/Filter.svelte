<script type="ts">
	export let filterClassname;
	export let filterHeader;
	export let selectType;
</script>

<div class="filter {filterClassname}">
	<div class="filter-header">
		<p class="name">{filterHeader}</p>
	</div>

	<div class="filter-content">
		<ul class="select {selectType}">
			<slot />
		</ul>
	</div>
</div>

<style>
	.filter {
		background-color: #d5d7df;
		border-radius: 39px;
		margin-bottom: 7vh;
		font-family: 'Lato';
		transition: 5s;
	}

	.filter-header > .name {
		padding-top: 5vh;
		padding-left: 4vw;
		font-family: 'Lato-bold';
		font-size: 24pt;
		flex: 1;
	}

	.filter-content {
		font-family: 'Lato';
		font-size: 24pt;
		flex: 1;
	}

	:global(.select-radio > .active):before {
		background-color: #1364df !important;
	}

	.select {
		padding: 0;
		list-style-type: none;
	}

	.filter-location > .filter-content > .select,
	.filter-category > .filter-content > .select {
		width: 100%;
		height: 50vh;
		overflow-y: auto;
	}

	:global(.select > li) {
		text-align: center;
		padding-top: 20px;
		border-bottom: 1px #000 solid;
		margin-left: 40px;
		margin-right: 40px;
		padding-bottom: 20px;
	}

	:global(.select > li):hover {
		cursor: pointer;
	}

	:global(.select > li):last-child {
		border: none;
	}

	:global(.inline-button) {
		transition: all 0.2s ease;
	}

	:global(.inline-button):hover {
		background-color: #838383;
		color: #fff;
		transition: all 0.2s ease;
	}

	:global(.select-list > .active) {
		background-color: #1364df;
		color: #fff;
	}
</style>
