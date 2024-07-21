<script lang="ts">
	import { GridGet } from '$lib/inRange';
	import { onMount } from 'svelte';

	interface Grid {
		col: number;
		row: number;
	}

	let a: Grid[][]; // a是Grid数组的数组
	let b: Grid[] = []; // b是Grid对象的数组
	let maxCol = 1;
	let maxRow = 1;

	export let resetRange = false;

	async function reGrid() {
		a = await GridGet();
		if (a.length > 0) {
			// 随机取a.length个数组中的一个数组
			const ra = Math.floor(Math.random() * a.length);
			b = a[ra]; // 将a的第三个数组赋值给b
			// 对b数组进行排序，先按col排序，再按row排序
			b.sort((grid1, grid2) => {
				if (grid1.col === grid2.col) {
					return grid1.row - grid2.row;
				}
				return grid1.col - grid2.col;
			});
			// 将col和row的最小值找到
			let minCol = Infinity;
			let minRow = Infinity;
			b.forEach((grid) => {
				if (grid.col < minCol) minCol = grid.col;
				if (grid.row < minRow) minRow = grid.row;
			});
			// 如果col或row的最小值为负值，将所有的col和row都平移到非负范围内
			if (minCol < 1) {
				b.forEach((grid) => {
					grid.col += Math.abs(minCol) + 1;
				});
			}
			if (minRow < 1) {
				b.forEach((grid) => {
					grid.row += Math.abs(minRow) + 1;
				});
			}
			// 重新计算最大的col和row值
			maxCol = 1;
			maxRow = 1;
			b.forEach((grid) => {
				if (grid.col > maxCol) maxCol = grid.col;
				if (grid.row > maxRow) maxRow = grid.row;
			});
			// 翻转col的值
			let maxColTemp = maxCol;
			b.forEach((grid) => {
				grid.col = maxColTemp - grid.col + 1;
			});
		}
	}

	onMount(async () => {
		reGrid();
	});

	$: if (resetRange) {
		reGrid();
		resetRange = false;
	}
</script>

<div class="grid_title">攻击范围</div>
<div
	class="grid"
	style="display: grid; grid-template-columns: repeat({maxRow}, 40px); grid-template-rows: repeat({maxCol}, 40px); grid-gap: 5px;"
>
	{#each b as grid (grid.col + '-' + grid.row)}
		<div class="box" style="grid-column: {grid.row}; grid-row: {grid.col};"></div>
	{/each}
</div>

<style>
	.grid_title {
		text-align: center;
		margin: 10px;
	}
	.grid {
		display: grid;
		grid-gap: 5px;
		justify-content: center;
	}
	/* 白色边框,透明度高的颜色,现代 */
	.box {
		border: 1px solid #fff;
		background-color: rgba(0, 0, 0, 0.1);
		height: 40px;
		width: 40px;
	}
</style>
