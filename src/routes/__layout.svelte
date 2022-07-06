<script lang="ts">
	import { base } from '$app/paths';
</script>

<div class="app-container">
	<div id="logo-container">
		<a href="{base}/" id="logo">JobFinder</a>
	</div>
	<slot />
</div>

<style>
	@font-face {
		font-family: 'Lato-bold';
		src: url('../lib/fonts/Lato-Bold.ttf');
	}
	@font-face {
		font-family: 'Lato';
		src: url('../lib/fonts/Lato-Regular.ttf');
	}
	#logo {
		font-family: 'Brawler', sans-serif;
		font-weight: bold;
		font-size: 3.1vmax;
		text-decoration: none;
		color: black;
	}
	.app-container {
		display: flex;
		flex-direction: column;
		margin-left: 10vw;
		margin-right: 10vw;
	}
	#logo-container {
		display: flex;
		flex-direction: row;
		justify-content: end;
	}
</style>
