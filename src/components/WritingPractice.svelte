<script>
	import { onMount } from 'svelte';

	/**
	 * @type {HTMLCanvasElement}
	 */
	let canvas;
	/**
	 * @type {CanvasRenderingContext2D | null}
	 */
	let ctx;
	let drawing = false;
	/**
	 * @type {any}
	 */
	let currentCharacter;
	export let character;

	onMount(() => {
		ctx = canvas.getContext('2d');
		ctx.strokeStyle = '#000';
		ctx.lineWidth = 3;
		currentCharacter = character;
	}); 

	function startDrawing(e) {
		drawing = true;
		draw(e);
	}

	function stopDrawing() {
		drawing = false;
		ctx.beginPath();
	}

	function draw(e) {
		if (!drawing) return;
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		ctx.lineTo(x, y);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(x, y);
	}

	function clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
</script>

<div class="flex flex-col items-center gap-4">
	<div class="mb-2 text-6xl">{currentCharacter}</div>
	<canvas
		bind:this={canvas}
		width="400"
		height="400"
		class="touch-none rounded-lg border-2 border-gray-300 bg-white"
		on:mousedown={startDrawing}
		on:mousemove={draw}
		on:mouseup={stopDrawing}
		on:mouseleave={stopDrawing}
	/>
	<button on:click={clearCanvas} class="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300">
		Clear
	</button>
</div>
