<script>
	import { userStats } from '../lib/store';

	export let onUsePowerup;
	export let onClose;
</script>

<div class="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
	<div class="m-4 w-full max-w-md rounded-xl bg-white p-6">
		<div class="mb-6 flex items-center justify-between">
			<h3 class="text-2xl font-bold">Power-ups</h3>
			<button on:click={onClose} class="text-gray-500 hover:text-gray-700"> ✕ </button>
		</div>

		<div class="grid grid-cols-3 gap-4">
			<button
				on:click={() => onUsePowerup('skipQuestion')}
				disabled={$userStats.powerups.skipQuestion <= 0}
				class="rounded-lg bg-blue-100 p-4 transition-colors hover:bg-blue-200 disabled:opacity-50"
			>
				<span class="material-icons text-3xl">skip</span>
				<p>Skip ({$userStats.powerups.skipQuestion})</p>
			</button>

			<button
				on:click={() => onUsePowerup('extraTime')}
				disabled={$userStats.powerups.extraTime <= 0}
				class="rounded-lg bg-green-100 p-4 transition-colors hover:bg-green-200 disabled:opacity-50"
			>
				<span class="material-icons text-3xl">timer</span>
				<p>+15s ({$userStats.powerups.extraTime})</p>
			</button>

			<button
				on:click={() => onUsePowerup('fiftyFifty')}
				disabled={$userStats.powerups.fiftyFifty <= 0}
				class="rounded-lg bg-yellow-100 p-4 transition-colors hover:bg-yellow-200 disabled:opacity-50"
			>
				<span class="material-icons text-3xl">safety</span>
				<p>50:50 ({$userStats.powerups.fiftyFifty})</p>
			</button>
		</div>
	</div>
</div>
