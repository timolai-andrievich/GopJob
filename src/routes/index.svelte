<script lang="ts">
	import { base } from '$app/paths';
	import MediaQuery from 'svelte-media-query';
</script>

<svelte:head>
	<title>JobFinder - Homepage</title>
</svelte:head>

<MediaQuery query="(max-width: 600px)" let:matches>
	{#if matches}
		<div class="main-block-mobile">
			<img src="{base}/logo_main.png" alt="JobFinder logo" />
			<form action="{base}/filter/">
				<button class="btn-mobile discovery-button-mobile">Discover Jobs</button>
			</form>
		</div>
		<div class="hot-mobile">
			<div class="heading-hot-mobile">
				<img src="{base}/fire_black.png" alt="fire icon" />
				<h2 class="h2-mobile">Hot vacancies!</h2>
			</div>
			<p>Find your dream job right now on JobFinder!</p>
			<p class="padd-mobile">
				Just click the button bellow and you will see a list of the latest and most relevant
				vacancies from the most reliable employers!
			</p>
			<form action="{base}/hot/">
				<button class="btn-mobile">Find Jobs Right Now</button>
			</form>
		</div>

		<div class="features-mobile">
			<h2 class="h2-mobile">How JobFinder works for You.</h2>
			<div class="container-mobile">
				<div class="find subcard-mobile">
					<p>Find the Right Job</p>
					<img src="{base}/find_job.png" alt="job icon" />
				</div>
				<div class="research subcard-mobile">
					<p>Research Companies</p>
					<img src="{base}/research_companies.png" alt="company icon" />
				</div>
				<div class="compare subcard-mobile">
					<p>Compare Salaries</p>
					<img src="{base}/compare_salaries.png" alt="money icon" />
				</div>
				<div class="apply subcard-mobile">
					<p>Apply to Jobs</p>
					<img src="{base}/apply.png" alt="apply icon" />
				</div>
			</div>
		</div>
		<div class="form-mobile">
			<h2 class="h2-mobile">Leave your email to be the first to find out about new vacancies!</h2>
			<form
				action="mailto:nestpaul1569@gmail.com?subject=Subscription Request&body=Hello, I'd like to subscribe to your newsletters! Please, add my email address to a list."
			>
				<button class="btn-mobile">Send request for subscription</button>
			</form>
		</div>
	{/if}
</MediaQuery>
<MediaQuery query="(min-width: 601px)" let:matches>
	{#if matches}
		<div class="main-block">
			<img src="{base}/logo_main.png" alt="JobFinder logo" />
			<form action="{base}/filter/">
				<button class="btn discovery-button">Discover Jobs</button>
			</form>
		</div>
		<div class="hot">
			<div class="heading-hot">
				<img src="{base}/fire_black.png" alt="fire icon" />
				<h2>Hot vacancies!</h2>
			</div>
			<p>Find your dream job right now on JobFinder!</p>
			<p class="padd">
				Just click the button bellow and you will see a list of the latest and most relevant
				vacancies from the most reliable employers!
			</p>
			<form action="{base}/hot/">
				<button class="btn">Find Jobs Right Now</button>
			</form>
		</div>
		<div class="features">
			<h2>How JobFinder works for You.</h2>
			<div class="container">
				<div class="find subcard">
					<p>Find the Right Job</p>
					<img src="{base}/find_job.png" alt="job icon" />
				</div>
				<div class="research subcard">
					<p>Research Companies</p>
					<img src="{base}/research_companies.png" alt="company icon" />
				</div>
				<div class="compare subcard">
					<p>Compare Salaries</p>
					<img src="{base}/compare_salaries.png" alt="money icon" />
				</div>
				<div class="apply subcard">
					<p>Apply to Jobs</p>
					<img src="{base}/apply.png" alt="apply icon" />
				</div>
			</div>
		</div>
		<div class="form">
			<h2>Leave your email to be the first to find out about new vacancies!</h2>
			<form
				action="mailto:nestpaul1569@gmail.com?subject=Subscription Request&body=Hello, I'd like to subscribe to your newsletters! Please, add my email address to a list."
			>
				<button class="btn">Send request for subscription</button>
			</form>
		</div>
	{/if}
</MediaQuery>

<style>
	.main-block {
		background-image: url(./bg.png);
		background-repeat: no-repeat;
		background-size: cover;
		text-align: right;
		height: 800px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		padding-right: 70px;
	}
	.main-block > img {
		margin-top: 50px;
		width: 30%;
	}
	.discovery-button {
		margin-bottom: 150px;
		margin-right: 100px;
	}
	.hot {
		background-color: #fff;
		text-align: center;
		padding: 150px 150px;
	}
	.hot > p {
		font-size: 32px;
		font-family: 'Lato', sans-serif;
	}
	.padd {
		margin-bottom: 150px;
	}
	.heading-hot {
		display: flex;
		justify-content: center;
	}
	.heading-hot img {
		margin: auto 0;
		width: 80px;
		height: 100%;
	}
	.features {
		color: #fff;
		background-color: #898ea2;
		text-align: center;
		padding: 150px 0;
		font-family: 'Lato', sans-serif;
	}
	.features img {
		width: 145px;
		height: auto;
	}
	.container {
		max-width: 900px;
		margin: auto;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-areas:
			'one two'
			'three four';
		gap: 60px;
	}
	.subcard {
		padding: 20px 60px;
		background-color: #df9977;
		max-width: 320px;
		text-align: center;
		margin: 0 auto;
		border-radius: 20px;
	}
	.find {
		grid-area: one;
	}
	.research {
		grid-area: two;
	}
	.compare {
		grid-area: three;
	}
	.apply {
		grid-area: four;
	}
	.form {
		padding: 150px 70px;
		text-align: center;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.btn {
		background-color: #df9977;
		color: #fff;
		padding: 20px 60px;
		border: #df9977 solid 3px;
		border-radius: 48px;
		font-size: 32px;
		font-family: 'Lato', sans-serif;
		transition: 0.3s linear;
	}
	.btn:hover {
		color: #df9977;
		background-color: #fff;
		border: #df9977 solid 3px;
		cursor: pointer;
	}
	h2 {
		font-family: 'Lato-bold', sans-serif;
		font-size: 64px;
	}
	.form button {
		margin-top: 50px;
	}
	.main-block-mobile {
		background-image: url(./bg.png);
		background-repeat: no-repeat;
		background-size: cover;
		text-align: center;
		height: 700px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding-right: 0;
	}
	.main-block-mobile > img {
		margin-top: 50px;
		width: 80%;
	}
	.discovery-button-mobile {
		margin-bottom: 90px;
	}
	.hot-mobile {
		background-color: #fff;
		text-align: center;
		padding: 150px 80px;
	}
	.hot-mobile img {
		width: 70px;
	}
	.btn-mobile {
		background-color: #df9977;
		color: #fff;
		padding: 10px 40px;
		border: #df9977 solid 3px;
		border-radius: 48px;
		font-size: 24px;
		font-family: 'Lato', sans-serif;
		transition: 0.3s linear;
	}
	.h2-mobile {
		font-family: 'Lato-bold', sans-serif;
		font-size: 40px;
	}
	.hot-mobile > p {
		font-size: 24px;
		font-family: 'Lato', sans-serif;
	}
	.padd-mobile {
		margin-bottom: 70px;
	}
	.features-mobile {
		color: #fff;
		background-color: #898ea2;
		text-align: center;
		padding: 100px 50px;
		font-family: 'Lato', sans-serif;
	}
	.subcard-mobile {
		padding: 20px 60px;
		background-color: #df9977;
		max-width: 250px;
		text-align: center;
		margin: 0 auto;
		border-radius: 20px;
		margin-top: 40px;
	}
	.features-mobile img {
		width: 145px;
		height: auto;
	}
	.form-mobile {
		padding: 100px 70px;
		text-align: center;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.form-mobile button {
		margin-top: 40px;
	}
</style>
