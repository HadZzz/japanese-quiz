<script>
	export let achievement;
</script>

<div
	class="animate-slide-in fixed right-4 top-4 z-50 rounded-lg bg-yellow-500/90 p-4 text-white backdrop-blur-sm"
>
	<h3 class="flex items-center gap-2 text-lg font-bold">
		{achievement.icon} Achievement Unlocked!
	</h3>
	<p class="font-medium">{achievement.title}</p>
	<p class="text-sm opacity-90">{achievement.description}</p>
</div>

<style>
	.animate-slide-in {
		animation: slideIn 0.5s ease-out;
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
</style>
