<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>JobFinder - Homepage</title>
</svelte:head>

<div class="main-block">
	<img src="{base}/logo_main.png" alt="JobFinder logo" />
	<a href="{base}/filter"><button class="btn discovery-button">Discover Jobs</button></a>
</div>
<div class="hot">
	<div class="heading-hot">
		<img src="{base}/fire_black.png" alt="fire icon" />
		<h2>Hot vacancies!</h2>
	</div>
	<p>Find your dream job right now on JobFinder!</p>
	<p class="padd">
		Just click the button bellow and you will see a list of the latest and most relevant vacancies
		from the most reliable employers!
	</p>
	<a href="{base}/hot"><button class="btn">Find Jobs Right Now</button></a>
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
	<a
		href="mailto:nestpaul1569@gmail.com?subject=Subscription Request&body=Hello, I'd like to subscribe to your newsletters! Please, add my email address to a list."
		><button class="btn">Send request for subscription</button></a
	>
</div>

<style>
	a {
		text-decoration: none;
	}
	.main-block {
		background-image: url($lib/assets/bg.png);
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
		border: none;
		border-radius: 48px;
		font-size: 32px;
		font-family: 'Lato', sans-serif;
	}
	h2 {
		font-family: 'Lato-bold', sans-serif;
		font-size: 64px;
	}
	.form button {
		margin-top: 50px;
	}
</style>
