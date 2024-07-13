<script lang="ts" setup>
	import { randomArrayItem, similarOp } from '$lib';
	import { ray, profession, faction, rarity, ori, childcar } from '$lib';
	import { onMount } from 'svelte';
	import Footer from '$lib/Footer.svelte';
	let user_ray = '';
	type ChildcarKey = '先锋' | '近卫' | '重装' | '狙击' | '术师' | '医疗' | '辅助' | '特种' | '';

	let user_pro: ChildcarKey = '';
	let user_faction = '';
	let user_rar = '';
	let user_ori = '';

	let user_childcar = '';
	let user = {};
	let Similar: string | any[] = [];
	let show = false;
	function randomUser() {
		user_ray = randomArrayItem(ray);
		user_pro = randomArrayItem(profession) as ChildcarKey;
		user_faction = randomArrayItem(faction);
		user_rar = randomArrayItem(rarity);
		user_ori = randomArrayItem(ori);
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
		// show = false;
		simOp();
	}
	async function simOp() {
		Similar = await similarOp(user);
		show = true;
	}
	onMount(() => {});
</script>

<main>
	<Footer />
	<div class="operator_main">
		<p>
			你是出生在{user_ori}现隶属于{user_faction}阵营的{user_ray},你的职业是{user_rar}星{user_pro}。
		</p>
		<p>你的子职业是{user_childcar}</p>
		<button class="btn variant-soft btn_ma" on:click={randomUser}>再次转生</button>
		<div class="operator_side">
			{#if show}
				<div class="operator_cards">
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

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 92vh;
	}
	/* 垂直居中 */
	.operator_main {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.btn_ma {
		margin-top: 5px;
		margin-bottom: 5px;
	}
	.operator_side {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.operator_cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.operator_card {
		margin: 5px;
	}
</style>
