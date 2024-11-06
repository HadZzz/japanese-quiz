import { writable } from 'svelte/store';

export const userStats = writable({
	score: 0,
	highScore: 0,
	dailyStreak: 0,
	achievements: [],
	powerups: {
		skipQuestion: 2,
		extraTime: 2,
		fiftyFifty: 2
	}
});
