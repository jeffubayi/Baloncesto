<script>
	export let name;

	function ToggleName () {
		if (name === "world"){
            name = "jeff"
		}
		else {
			name = "world"
		}
	}

</script>

<main>
	<h1>Hello {name}!</h1>
	<button on:click={ToggleName}></button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>