<script>
	import WritingPractice from '../components/WritingPractice.svelte';
	import DailyChallenge from '../components/DailyCalange.svelte';
	import LevelProgress from '../components/LevelProgress.svelte';
	import Settings from '../components/Settings.svelte';
	import { userProgress, gameSettings } from '../lib/GameStore';

	let quizTypes = [
		{
			id: 'hiragana',
			title: 'ひらがな',
			description: 'Learn basic Japanese phonetic characters',
			icon: '仮',
			color: 'from-pink-500 to-red-500'
		},
		{
			id: 'katakana',
			title: 'カタカナ',
			description: 'Practice foreign word characters',
			icon: '名',
			color: 'from-blue-500 to-indigo-500'
		},
		{
			id: 'kanji',
			title: '漢字',
			description: 'Master Japanese ideographic characters',
			icon: '字',
			color: 'from-green-500 to-teal-500'
		}
	];
</script>

<div class="container mx-auto px-4 py-8">
	<header class="mb-16 text-center">
		<h1
			class="mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-6xl font-bold text-transparent"
		>
			日本語クイズ
		</h1>
		<p class="text-lg text-gray-200">Master Japanese Writing Systems</p>
	</header>
	<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
		<LevelProgress />
		<DailyChallenge />
	</div>
	<div class="grid gap-8 md:grid-cols-3">
		{#each quizTypes as quiz}
			<a href="/{quiz.id}" class="perspective group">
				<div class="group-hover:rotate-y-180 relative transform transition-all duration-500">
					<div
						class="transform rounded-xl border-2 border-red-100 bg-white/90 p-8 shadow-xl backdrop-blur-sm transition-all duration-500 group-hover:opacity-0"
					>
						<div class="mb-4 bg-gradient-to-r text-6xl {quiz.color} bg-clip-text text-transparent">
							{quiz.icon}
						</div>
						<h2 class="mb-3 text-3xl font-bold text-gray-800">{quiz.title}</h2>
						<p class="text-gray-600">{quiz.description}</p>
					</div>

					<div
						class="absolute inset-0 bg-gradient-to-r {quiz.color} rotate-y-180 transform rounded-xl p-8 opacity-0 shadow-xl transition-all duration-500 group-hover:opacity-100"
					>
						<div class="rotate-y-180 flex h-full flex-col items-center justify-center text-white">
							<p class="mb-4 text-4xl">{quiz.title}</p>
							<p class="text-lg">Start Quiz →</p>
						</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
<!-- Writing Practice Section -->
<div class="mb-8">
	<h2 class="mb-4 text-2xl font-bold text-white">Writing Practice</h2>
	<div class="rounded-xl bg-white/90 p-6 backdrop-blur-sm">
		<WritingPractice character="字" />
	</div>
</div>

<!-- Settings Section -->
<div class="mb-8">
	<h2 class="mb-4 text-2xl font-bold text-white">Settings</h2>
	<Settings />
</div>

<style>
	.perspective {
		perspective: 1000px;
	}

	.rotate-y-180 {
		transform: rotateY(180deg);
	}
</style>
