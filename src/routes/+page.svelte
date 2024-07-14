<script lang="ts" setup>
	import { randomArrayItem, similarOp, randomStar, randomSix, changeData } from '$lib';
	import { ray, profession, faction, rarity, ori, childcar, six, condition } from '$lib';
	import { onMount } from 'svelte';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		ArcElement,
		RadialLinearScale
	} from 'chart.js';
	import { PolarArea } from 'svelte-chartjs';
	import Footer from '$lib/Footer.svelte';
	ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale);
	let data = {
		datasets: [
			{
				data: [10, 20, 30, 40, 50, 60],
				backgroundColor: [
					'rgba(255, 99, 132, 0.5)', // 物理强度 - 红色
					'rgba(54, 162, 235, 0.5)', // 战场机动 - 蓝色
					'rgba(75, 192, 192, 0.5)', // 生理耐受 - 绿色
					'rgba(255, 206, 86, 0.5)', // 战术规划 - 黄色
					'rgba(153, 102, 255, 0.5)', // 战术技巧 - 紫色
					'rgba(255, 159, 64, 0.5)' // 源石技艺适应性 - 橙色
				],
				label: '' // for legend
			}
		],
		labels: ['物理强度', '战场机动', '生理耐受', '战术规划', '战术技巧', '源石技艺适应性']
	};
	const options = {
		responsive: true,
		plugins: {
			tooltip: {
				enable: true,
				callbacks: {
					label: function (tooltipItem) {
						// let labelIndex = tooltipItem.index;
						// let value = data.datasets[tooltipItem.datasetIndex].data[labelIndex];
						let labelMap = {
							10: '缺陷',
							20: '普通',
							30: '标准',
							40: '优良',
							50: '卓越',
							60: '其他'
						};
						const value = tooltipItem.raw;
						// 0-10为缺陷，10-20为普通，20-30为标准，30-40为优良，40-50为卓越，50-无上限为其他
						if (value >= 0 && value < 10) {
							return labelMap[10] || '';
						} else if (value >= 10 && value < 20) {
							return labelMap[20] || '';
						} else if (value >= 20 && value < 30) {
							return labelMap[30] || '';
						} else if (value >= 30 && value < 40) {
							return labelMap[40] || '';
						} else if (value >= 40 && value < 50) {
							return labelMap[50] || '';
						} else {
							return labelMap[60] || '';
						}
						// 现在可以安全地访问data.datasets
					}
				}
			}
		},
		scales: {
			r: {
				pointLabels: {
					display: true
				},
				ticks: {
					display: false // 隐藏中间的刻度
				}
			}
		}
	};
	let user_ray = '';
	type ChildcarKey = '先锋' | '近卫' | '重装' | '狙击' | '术师' | '医疗' | '辅助' | '特种' | '';

	let user_pro: ChildcarKey = '';
	let user_faction = '';
	let user_rar = '';
	let user_ori = '';

	let user_childcar = '';
	let user_condition = '';
	// 六维
	let user_six: number[] = [];
	let user = {};
	let Similar: string | any[] = [];
	let show = false;
	function randomUser() {
		user_ray = randomArrayItem(ray);
		user_pro = randomArrayItem(profession) as ChildcarKey;
		user_faction = randomArrayItem(faction);
		user_rar = randomStar();
		user_ori = randomArrayItem(ori);
		user_condition = randomArrayItem(condition);
		for (let i = 0; i < 6; i++) {
			user_six[i] = randomSix();
		}
		// childcar对应的是职业，所以要根据职业来随机
		// childcar是一个对象,每个键值对对应的值是数组
		// 通过职业来获取对应的数组
		user_childcar = randomArrayItem(childcar[user_pro]);
		user = {
			ray: user_ray,
			profession: user_pro,
			faction: user_faction,
			rarity: user_rar,
			ori: user_ori
		};
		data = changeData(data, user_six);
		// show = false;
		simOp();
	}
	async function simOp() {
		Similar = await similarOp(user);
		show = true;
	}
	onMount(() => {});
</script>

<main class="main">
	<div class="operator_main">
		<p>
			你是出生在{user_ori}现隶属于{user_faction}阵营的{user_ray},你的职业是{user_rar}星{user_pro}。
		</p>
		<p>你的子职业是{user_childcar}</p>
		<p>{user_condition}</p>
		<button class="btn variant-soft btn_ma" on:click={randomUser}>再次转生</button>
		<div
			class="operator_side snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto"
		>
			{#if show}
				<div class="snap-start card shrink-0 md:w-80 text-center">
					<PolarArea class="myChart chart" {data} {options} />
				</div>
				<div class="operator_cards snap-start shrink-0 md:w-80 text-center">
					{#each Similar as item}
						<div class="card p-4 card-hover block operator_card">
							<header class="card-header">
								<a href={`https://prts.wiki/w/${item.name}`}>{item.name}</a>
							</header>
							<!-- sim保留两位百分比显示 -->
							<!-- 相似度转换成字符串取前两个 -->
							<section class="p-4">
								<p>相似度：{(item.sim * 100).toString().slice(0, 4)}%</p>
								<p>职业：{item.profession}</p>
								<p>子职业: {item.childcar}</p>
								<p>阵营：{item.faction}</p>
								<p>星级：{parseInt(item.rarity) + 1}</p>
								<p>出生地：{item.ori}</p>
							</section>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</main>
<footer>
	<Footer />
</footer>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 92vh;
	}
	.main {
		height: 97vh;
	}
	/* 垂直居中 */
	.operator_main {
		height: 100%;
		width: 75%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.btn_ma {
		margin-top: 5px;
		margin-bottom: 5px;
	}
	/* side里的两个块横向排列 */
	.operator_side {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.operator_cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		/* max-width: 50%; */
		/* flex: 1; */
	}
	.chart {
		max-width: 50%;
		flex: 1;
	}
	.operator_card {
		margin: 5px;
	}
	/* 响应式媒体查询 */
	@media (max-width: 600px) {
		.card {
			width: 100%; /* 在小屏幕上卡片宽度为100% */
			margin: 10px 0;
			padding: 15px;
		}
	}
</style>
