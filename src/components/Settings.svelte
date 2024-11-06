<script>
	import { gameSettings } from '../lib/GameStore';

	const themes = {
		traditional: 'Traditional Japanese',
		modern: 'Modern',
		minimal: 'Minimal'
	};

	const difficulties = {
		easy: 'Easy - More time, hints available',
		normal: 'Normal - Standard rules',
		hard: 'Hard - Less time, no hints'
	};
</script>

<div class="rounded-xl bg-white/90 p-6 backdrop-blur-sm">
	<h2 class="mb-6 text-2xl font-bold">Settings</h2>

	<div class="space-y-6">
		<div>
			<label class="mb-2 block text-sm font-medium text-gray-700"> Theme </label>
			<select bind:value={$gameSettings.theme} class="w-full rounded-lg border p-2">
				{#each Object.entries(themes) as [value, label]}
					<option {value}>{label}</option>
				{/each}
			</select>
		</div>

		<div>
			<label class="mb-2 block text-sm font-medium text-gray-700"> Difficulty </label>
			<select bind:value={$gameSettings.difficulty} class="w-full rounded-lg border p-2">
				{#each Object.entries(difficulties) as [value, label]}
					<option {value}>{label}</option>
				{/each}
			</select>
		</div>

		<div class="flex items-center justify-between">
			<span class="text-sm font-medium text-gray-700">Sound Effects</span>
			<button
				class="relative h-6 w-12 rounded-full bg-gray-200 transition-colors"
				class:bg-green-500={$gameSettings.soundEnabled}
				on:click={() => ($gameSettings.soundEnabled = !$gameSettings.soundEnabled)}
			>
				<span
					class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform"
					class:translate-x-6={$gameSettings.soundEnabled}
				/>
			</button>
		</div>

		<div class="flex items-center justify-between">
			<span class="text-sm font-medium text-gray-700">Show Romaji</span>
			<button
				class="relative h-6 w-12 rounded-full bg-gray-200 transition-colors"
				class:bg-green-500={$gameSettings.showRomaji}
				on:click={() => ($gameSettings.showRomaji = !$gameSettings.showRomaji)}
			>
				<span
					class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform"
					class:translate-x-6={$gameSettings.showRomaji}
				/>
			</button>
		</div>
	</div>
</div>
