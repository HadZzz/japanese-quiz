<script>
	export let score;
	export let highScore;
	export let onRestart;
	export let onExit;
</script>

<div class="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
	<div class="m-4 w-full max-w-md rounded-xl bg-white p-8 text-center">
		<h2 class="mb-2 text-3xl font-bold">Game Over</h2>
		<p class="mb-6 text-gray-600">Great effort! Here's how you did:</p>

		<div class="mb-8 grid grid-cols-2 gap-4">
			<div class="rounded-lg bg-gray-100 p-4">
				<p class="text-sm text-gray-600">Score</p>
				<p class="text-2xl font-bold">{score}</p>
			</div>
			<div class="rounded-lg bg-gray-100 p-4">
				<p class="text-sm text-gray-600">High Score</p>
				<p class="text-2xl font-bold">{highScore}</p>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-4">
			<button
				on:click={onRestart}
				class="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
			>
				Try Again
			</button>
			<button
				on:click={onExit}
				class="rounded-lg bg-gray-500 px-6 py-3 text-white transition-colors hover:bg-gray-600"
			>
				Exit
			</button>
		</div>
	</div>
</div>
