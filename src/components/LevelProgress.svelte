<script>
	import { userProgress } from '../lib/GameStore';

	$: currentLevel = $userProgress.level;
	$: currentExp = $userProgress.exp;
	$: expForNext = Math.pow(currentLevel, 2) * 100;
	$: progress = (currentExp / expForNext) * 100;
</script>

<div class="rounded-lg bg-white/90 p-4 backdrop-blur-sm">
	<div class="mb-2 flex items-center gap-4">
		<div
			class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 font-bold text-white"
		>
			{currentLevel}
		</div>
		<div>
			<div class="font-bold">Level {currentLevel}</div>
			<div class="text-sm text-gray-600">
				{currentExp}/{expForNext} XP
			</div>
		</div>
	</div>

	<div class="h-2 w-full rounded-full bg-gray-200">
		<div class="h-full rounded-full bg-blue-500 transition-all" style="width: {progress}%" />
	</div>
</div>
