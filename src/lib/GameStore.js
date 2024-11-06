import { writable } from 'svelte/store';

export const userProgress = writable({
	level: 1,
	exp: 0,
	dailyStreak: 0,
	lastPlayed: null,
	stats: {
		hiragana: { mastered: [], learning: [], accuracy: {} },
		katakana: { mastered: [], learning: [], accuracy: {} },
		kanji: { mastered: [], learning: [], accuracy: {} }
	}
});

export const gameSettings = writable({
	theme: 'traditional',
	soundEnabled: true,
	showRomaji: true,
	difficulty: 'normal'
});
