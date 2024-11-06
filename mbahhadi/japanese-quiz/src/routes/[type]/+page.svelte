<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { userStats } from '../../lib/store';
	import { hiragana, katakana, kanji } from '../../lib/data/data';
	import { ACHIEVEMENTS } from '../../lib/constans';
	import AchievementNotification from '../../lib/AchiveNotif.svelte';
	import PowerupModal from '../../lib/PowerModal.svelte';
	import GameOverModal from '../../lib/GameOver.svelte';

	let currentQuestion = 0;
	let score = 0;
	/**
	 * @type {any[]}
	 */
	let questions = [];
	let userAnswer = '';
	let showResult = false;
	let isCorrect = false;
	let showHint = false;
	let lives = 3;
	let streak = 0;
	let lastAnswerTime = 0;
	let comboMultiplier = 1;
	let timeLeft = 30;
	/**
	 * @type {number | undefined}
	 */
	let timer;
	let showPowerupModal = false;
	let showAchievementModal = false;
	let showGameOverModal = false;
	/**
	 * @type {null}
	 */
	let lastAchievement = null;

	$: quizType = $page.params.type;

	onMount(() => {
		switch (quizType) {
			case 'hiragana':
				questions = [...hiragana].sort(() => Math.random() - 0.5);
				break;
			case 'katakana':
				questions = [...katakana].sort(() => Math.random() - 0.5);
				break;
			case 'kanji':
				questions = [...kanji].sort(() => Math.random() - 0.5);
				break;
		}
		startQuestion();
	});

	function startTimer() {
		timeLeft = 30;
		if (timer) clearInterval(timer);
		timer = setInterval(() => {
			if (timeLeft > 0) {
				timeLeft--;
			} else {
				checkAnswer(true);
			}
		}, 1000);
	}

	function startQuestion() {
		lastAnswerTime = Date.now();
		startTimer();
	}

	function checkAnswer(timeout = false) {
		const answerTime = (Date.now() - lastAnswerTime) / 1000;
		const current = questions[currentQuestion];

		if (timeout) {
			isCorrect = false;
			streak = 0;
			lives--;
			comboMultiplier = 1;
		} else {
			isCorrect =
				quizType === 'kanji'
					? userAnswer.toLowerCase() === current.reading.toLowerCase() ||
						userAnswer.toLowerCase() === current.meaning.toLowerCase()
					: userAnswer.toLowerCase() === current.reading.toLowerCase();

			if (isCorrect) {
				const timeBonus = Math.max(0, Math.floor((30 - answerTime) * 10));
				const points = (100 + timeBonus) * comboMultiplier;
				score += points;

				streak++;
				comboMultiplier = Math.min(5, comboMultiplier + 0.5);

				// Check achievements
				if (answerTime < 5) unlockAchievement(ACHIEVEMENTS.SPEED_DEMON);
				if (comboMultiplier >= 5) unlockAchievement(ACHIEVEMENTS.COMBO_MASTER);
				if (currentQuestion === questions.length - 1 && lives === 3) {
					unlockAchievement(ACHIEVEMENTS.SURVIVAL_EXPERT);
				}
			} else {
				streak = 0;
				lives--;
				comboMultiplier = 1;
			}
		}

		showResult = true;
		clearInterval(timer);

		if (lives <= 0) {
			endGame();
		}
	}

	/**
	 * @param {{ id: any; title?: string; description?: string; icon?: string; } | null} achievement
	 */
	function unlockAchievement(achievement) {
		if (!$userStats.achievements.find((a) => a.id === achievement.id)) {
			$userStats.achievements = [...$userStats.achievements, achievement];
			lastAchievement = achievement;
			showAchievementModal = true;
			setTimeout(() => {
				showAchievementModal = false;
				lastAchievement = null;
			}, 3000);
		}
	}

	/**
	 * @param {string | number} type
	 */
	function usePowerup(type) {
		if ($userStats.powerups[type] > 0) {
			$userStats.powerups[type]--;
			switch (type) {
				case 'skipQuestion':
					nextQuestion();
					break;
				case 'extraTime':
					timeLeft += 15;
					break;
				case 'fiftyFifty':
					// Implementation for multiple choice questions
					break;
			}
			showPowerupModal = false;
		}
	}

	function nextQuestion() {
		if (currentQuestion < questions.length - 1) {
			currentQuestion++;
			userAnswer = '';
			showResult = false;
			showHint = false;
			startQuestion();
		} else {
			endGame();
		}
	}

	function endGame() {
		clearInterval(timer);
		if (score > $userStats.highScore) {
			$userStats.highScore = score;
		}
		showGameOverModal = true;
	}

	function restartQuiz() {
		currentQuestion = 0;
		score = 0;
		lives = 3;
		streak = 0;
		comboMultiplier = 1;
		showGameOverModal = false;
		questions = questions.sort(() => Math.random() - 0.5);
		startQuestion();
	}

	function exitQuiz() {
		goto('/');
	}

	function getProgress() {
		return (currentQuestion / questions.length) * 100;
	}
</script>

<!-- Back Button -->
<button
	on:click={exitQuiz}
	class="fixed left-4 top-4 z-30 flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
>
	<span class="material-icons">Back to Menu</span>!
</button>

<!-- Achievement Notification -->
{#if showAchievementModal && lastAchievement}
	<AchievementNotification achievement={lastAchievement} />
{/if}

<!-- Power-up Modal -->
{#if showPowerupModal}
	<PowerupModal onUsePowerup={usePowerup} onClose={() => (showPowerupModal = false)} />
{/if}

<!-- Game Over Modal -->
{#if showGameOverModal}
	<GameOverModal
		{score}
		highScore={$userStats.highScore}
		onRestart={restartQuiz}
		onExit={exitQuiz}
	/>
{/if}

<!-- Game Stats Bar -->
<div class="fixed right-4 top-4 z-30 flex gap-6 rounded-lg bg-white/20 p-4 backdrop-blur-sm">
	<div class="flex items-center gap-2 text-white">
		<span class="material-icons text-black">favorite</span>
		<span class="font-bold text-black">{lives}</span>
	</div>
	<div class="flex items-center gap-2 text-white">
		<span class="material-icons text-black">star</span>
		<span class="font-bold text-black">{score}</span>
	</div>
	<div class="flex items-center gap-2 text-white">
		<span class="material-icons text-black">bolt</span>
		<span class="font-bold text-black">{comboMultiplier.toFixed(1)}x</span>
	</div>
	<button
		on:click={() => (showPowerupModal = true)}
		class="rounded-lg bg-white/20 px-3 py-1 transition-colors hover:bg-white/30"
	>
		<span class="material-icons">Feature</span>
	</button>
</div>

<!-- Main Quiz Content -->
<div class="container mx-auto px-4 py-8">
	<div class="mx-auto max-w-2xl">
		<div class="rounded-xl bg-white/90 p-8 shadow-xl backdrop-blur-sm">
			<!-- Progress Bar -->
			<div class="mb-6 h-2 w-full rounded-full bg-gray-200">
				<div
					class="h-full rounded-full bg-red-600 transition-all duration-500"
					style="width: {getProgress()}%"
				/>
			</div>

			<div class="mb-8 text-center">
				<h2
					class="mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent"
				>
					{#if quizType === 'hiragana'}
						ひらがな
					{:else if quizType === 'katakana'}
						カタカナ
					{:else}
						漢字
					{/if}
					クイズ
				</h2>

				<!-- Timer Bar -->
				<div class="mb-4 h-2 w-full rounded-full bg-gray-200">
					<div
						class="transition-linear h-full rounded-full bg-blue-600 duration-1000"
						style="width: {(timeLeft / 30) * 100}%"
					/>
				</div>

				<!-- Character Display -->
				<div class="my-8">
					<div
						class="mb-4 transform text-8xl font-bold text-gray-800 transition-transform hover:scale-110"
					>
						{questions[currentQuestion]?.char || ''}
					</div>
					{#if showHint}
						<p class="italic text-gray-600">
							Hint: {questions[currentQuestion]?.hint}
						</p>
					{/if}
				</div>
			</div>

			<!-- Input Section -->
			<div class="mb-6">
				<input
					type="text"
					bind:value={userAnswer}
					placeholder="Enter your answer..."
					class="w-full rounded-lg border-2 border-gray-200 bg-white/50 p-4 text-center text-lg focus:border-red-400 focus:outline-none"
					disabled={showResult}
					on:keydown={(e) => e.key === 'Enter' && !showResult && checkAnswer()}
				/>
			</div>

			<!-- Action Buttons -->
			{#if !showResult}
				<div class="mb-4 grid grid-cols-2 gap-4">
					<button
						on:click={() => checkAnswer()}
						class="rounded-lg bg-gradient-to-r from-red-600 to-pink-600 px-6 py-3 text-lg text-white transition-colors hover:from-red-700 hover:to-pink-700"
					>
						Check Answer
					</button>
					<button
						on:click={() => (showHint = true)}
						disabled={showHint}
						class="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-lg text-white transition-colors hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
					>
						Show Hint
					</button>
				</div>
			{:else}
				<div class="mb-6 text-center">
					<div class="mb-4 text-6xl">
						{isCorrect ? '🎉' : '😢'}
					</div>
					<p class={isCorrect ? 'mb-2 text-2xl text-green-600' : 'mb-2 text-2xl text-red-600'}>
						{isCorrect ? 'Correct!' : 'Wrong!'}
					</p>
					<p class="text-lg text-gray-600">
						Correct answer: {questions[currentQuestion].reading}
						{#if quizType === 'kanji'}
							({questions[currentQuestion].meaning})
						{/if}
					</p>
				</div>
				<button
					on:click={nextQuestion}
					class="w-full rounded-lg bg-gradient-to-r from-green-600 to-teal-600 py-3 text-lg text-white transition-colors hover:from-green-700 hover:to-teal-700"
				>
					Next Question
				</button>
			{/if}

			<!-- Statistics Footer -->
			<div class="mt-8 text-center text-gray-600">
				<p>Question {currentQuestion + 1} of {questions.length} | Streak: {streak}🔥</p>
			</div>
		</div>
	</div>
</div>
