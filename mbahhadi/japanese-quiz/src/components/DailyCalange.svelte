<script>
	import { userProgress } from '../lib/GameStore';
	import { onMount } from 'svelte';

	let challenges = [
		{
			id: 'daily_practice',
			title: 'Daily Practice',
			description: 'Complete 20 questions today',
			reward: 500,
			progress: 0,
			max: 20
		},
		{
			id: 'accuracy_master',
			title: 'Accuracy Master',
			description: 'Get 90% accuracy in one session',
			reward: 1000,
			progress: 0,
			max: 100
		}
	];

	/**
	 * @type {number}
	 */
	let timeUntilReset;

	onMount(() => {
		updateTimeUntilReset();
		const timer = setInterval(updateTimeUntilReset, 1000);
		return () => clearInterval(timer);
	});

	function updateTimeUntilReset() {
		const now = new Date();
		const tomorrow = new Date(now);
		tomorrow.setHours(24, 0, 0, 0);
		timeUntilReset = tomorrow - now;
	}

	function formatTime(ms) {
		const hours = Math.floor(ms / 3600000);
		const minutes = Math.floor((ms % 3600000) / 60000);
		return `${hours}h ${minutes}m`;
	}
</script>

<div class="rounded-xl bg-white/90 p-6 shadow-lg backdrop-blur-sm">
	<div class="mb-4 flex items-center justify-between">
		<h2 class="text-2xl font-bold">Daily Challenges</h2>
		<div class="text-sm text-gray-600">
			Resets in: {formatTime(timeUntilReset)}
		</div>
	</div>

	<div class="space-y-4">
		{#each challenges as challenge}
			<div class="rounded-lg border-2 border-gray-100 p-4">
				<div class="mb-2 flex items-start justify-between">
					<div>
						<h3 class="font-bold">{challenge.title}</h3>
						<p class="text-sm text-gray-600">{challenge.description}</p>
					</div>
					<div class="rounded-full bg-yellow-100 px-3 py-1 text-sm">
						{challenge.reward} XP
					</div>
				</div>

				<div class="h-2 w-full rounded-full bg-gray-200">
					<div
						class="h-full rounded-full bg-green-500 transition-all"
						style="width: {(challenge.progress / challenge.max) * 100}%"
					/>
				</div>
				<div class="mt-1 text-right text-sm text-gray-600">
					{challenge.progress}/{challenge.max}
				</div>
			</div>
		{/each}
	</div>
</div>
