<script>
	import '../app.css';
	import { onMount } from 'svelte';

	let kanjiGroups = [
		['私', '学', '愛', '心', '夢', '光', '道', '風', '空', '花'],
		['水', '火', '木', '金', '土', '日', '月', '年', '時', '分'],
		['人', '子', '女', '男', '目', '口', '手', '足', '耳', '声'],
		['山', '川', '田', '海', '空', '雨', '雪', '雲', '星', '夜'],
		['大', '小', '中', '外', '上', '下', '前', '後', '左', '右'],
		['私', '学', '愛', '心', '夢', '光', '道', '風', '空', '花'],
		['水', '火', '木', '金', '土', '日', '月', '年', '時', '分'],
		['人', '子', '女', '男', '目', '口', '手', '足', '耳', '声'],
		['山', '川', '田', '海', '空', '雨', '雪', '雲', '星', '夜']
	];

	let positions = [
		{ top: '2%', left: '5%', size: '8rem', opacity: '0.13', rotate: '-15deg' },
		{ top: '15%', right: '8%', size: '12rem', opacity: '0.14', rotate: '10deg' },
		{ top: '40%', left: '3%', size: '10rem', opacity: '0.13', rotate: '5deg' },
		{ top: '60%', right: '5%', size: '9rem', opacity: '0.14', rotate: '-8deg' },
		{ top: '75%', left: '10%', size: '11rem', opacity: '0.3', rotate: '12deg' },
		{ top: '85%', right: '3%', size: '7rem', opacity: '0.14', rotate: '-5deg' },
		{ top: '20%', left: '10%', size: '9rem', opacity: '0.13', rotate: '8deg' },
		{ top: '50%', right: '10%', size: '10rem', opacity: '0.14', rotate: '-12deg' },
		{ top: '70%', left: '5%', size: '8rem', opacity: '0.13', rotate: '15deg' }
	];

	let currentIndices = Array(positions.length).fill(0);

	onMount(() => {
		positions.forEach((_, index) => {
			setInterval(
				() => {
					currentIndices[index] = (currentIndices[index] + 1) % kanjiGroups[index].length;
				},
				3000 + index * 500
			);
		});
	});
</script>

<div class="relative min-h-screen">
	<!-- Background Image with Overlay -->
	<div class="fixed inset-0 z-0">
		<img
			src="https://images.unsplash.com/photo-E_scfTVpjT8"
			alt="Japanese Torii"
			class="h-full w-full object-cover"
		/>
		<div
			class="absolute inset-0 bg-gradient-to-br from-red-900/40 to-slate-900/40 backdrop-blur-sm"
		></div>
	</div>

	<!-- Floating Kanji -->
	{#each positions as pos, i}
		<div
			class="pointer-events-none fixed z-10 transition-all duration-1000"
			style="
		  top: {pos.top};
		  {pos.left ? 'left: ' + pos.left : 'right: ' + pos.right};
		  font-size: {pos.size};
		  opacity: {pos.opacity};
		  transform: rotate({pos.rotate});
		"
		>
			{kanjiGroups[i][currentIndices[i]]}
		</div>
	{/each}

	<!-- Main Content -->
	<div class="relative z-20">
		<slot />
	</div>
</div>
