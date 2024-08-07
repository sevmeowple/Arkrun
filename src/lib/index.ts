/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { base } from '$app/paths';
interface CharacterData {
	childcar: string;
	faction: string;
	name: string;
	ori: string;
	profession: string;
	rarity: string;
	ray: string;
}

interface All {
	'1': CharacterData[];
	'2': CharacterData[];
}

interface Talent {
	name: string;
	description: string;
}
// 一些常数
// 稀有度
const rarity = ['1', '2', '3', '4', '5', '6'];
// 职业
const profession = ['先锋', '近卫', '狙击', '重装', '医疗', '术师', '特种', '辅助'];
const childcar = {
	先锋: ['冲锋手', '尖兵', '情报官', '战术家', '执旗手'],
	近卫: [
		'剑豪',
		'强攻手',
		'撼地者',
		'收割者',
		'教官',
		'斗士',
		'无畏者',
		'术战者',
		'武者',
		'解放者',
		'重剑手',
		'领主'
	],
	重装: ['不屈者', '决战者', '哨戒铁卫', '守护者', '要塞', '铁卫', '驭法铁卫'],
	狙击: ['回环射手', '投掷手', '攻城手', '散射手', '炮手', '猎手', '神射手', '速射手', '重射手'],
	术师: [
		'中坚术师',
		'扩散术师',
		'本源术师',
		'秘术师',
		'轰击术师',
		'链术师',
		'阵法术师',
		'驭械术师'
	],
	医疗: ['医师', '咒愈师', '疗养师', '群愈师', '行医', '链愈师'],
	辅助: ['凝滞师', '削弱者', '召唤师', '吟游者', '工匠', '巫役', '护佑者'],
	特种: ['伏击客', '傀儡师', '处决者', '怪杰', '推击手', '行商', '钩索师', '陷阱师']
};
// 阵营/势力
const faction = [
	'罗德岛',
	'炎',
	'炎-龙门',
	'阿戈尔',
	'哥伦比亚',
	'东',
	'伊比利亚',
	'卡西米尔',
	'谢拉格',
	'拉特兰',
	'莱塔尼亚',
	'米诺斯',
	'雷姆必拓',
	'萨米',
	'萨尔贡',
	'叙拉古',
	'乌萨斯',
	'维多利亚',
	'玻利瓦尔',
	'罗德岛-精英干员',
	'S.W.E.E.P.',
	'巴别塔',
	'深海猎人',
	'黑钢国际',
	'格拉斯哥帮',
	'喀兰贸易',
	'龙门近卫局',
	'企鹅物流',
	'莱茵生命',
	'汐斯塔',
	'炎-岁',
	'行动组A4',
	'行动预备组A1',
	'行动预备组A4',
	'行动预备组A6',
	'贾维团伙',
	'使徒',
	'红松骑士团',
	'鲤氏侦探事务所',
	'彩虹小队',
	'乌萨斯学生自治团'
];
// 种族
const ray = [
	'龙',
	'黎博利',
	'麒麟',
	'鲁珀',
	'鬼',
	'阿达克利斯',
	'阿纳萨',
	'阿纳缇',
	'阿斯兰',
	'阿戈尔',
	'萨科塔',
	'萨弗拉',
	'萨卡兹',
	'菲林',
	'皮洛萨',
	'瓦伊凡',
	'瑞柏巴',
	'沃尔珀',
	'杜林',
	'札拉克',
	'曼提柯',
	'斐迪亚',
	'德拉克',
	'库兰塔',
	'安努拉',
	'奇美拉',
	'塞拉托',
	'埃拉菲亚',
	'卡特斯',
	'卡普里尼',
	'匹特拉姆',
	'依特拉',
	'佩洛',
	'乌萨斯',
	'丰蹄',
	'精灵',
	'未公开/不公开',
	'未知',
	'其他'
];
// 出身地
const ori = [
	'龙门',
	'雷姆必拓',
	'阿戈尔',
	'谢拉格',
	'萨米',
	'萨尔贡',
	'莱塔尼亚',
	'罗德岛',
	'维多利亚',
	'米诺斯',
	'瓦伊凡',
	'玻利瓦尔',
	'炎',
	'汐斯塔',
	'拉特兰',
	'哥伦比亚',
	'叙拉古',
	'卡西米尔',
	'卡兹戴尔',
	'伊比利亚',
	'乌萨斯',
	'东',
	'杜林',
	'未公开/不公开',
	'未知',
	'其他'
];
// 六维但是描述都是一样的
const six = ['其他', '卓越', '优良', '标准', '普通', '缺陷'];
// 感染状况
const condition = [
	'参照医学检测报告，确认为感染者。',
	'参照医学检测报告，确认为非感染者 。',
	'体表未发现任何源石结晶，确认为非感染者。',
	'体表有源石结晶分布，参照医学检测报告，确认为感染者。',
	'体内脏器 有可见源石结晶阴影，确认为感染者。',
	'作为一个萨卡兹，没有被感染是一种幸运，同时也是种不幸。',
	'参照医学检 测报告，干员应为感染者。',
	'体表有源石结晶分布，且参照医学检测报告，确认为感染者。',
	'该干员 的感染症状较为特殊，需要进行进一步的临床研究。',
	'体表有源石结晶分布，确认为感染者。',
	'体表无源石结晶分布，体内有可见 阴影，参照医学检测报告，确认为感染者。',
	'体表无源石结晶分布，且参照医学检测报告，确认为非感染者。',
	'外壳有大 量磨损，结构完整，强度正常。发动机与底盘状况良好。攻击设备运行正常，电池外壳有轻微损坏，使用正常。ECU状况良好。',
	'外壳有少量磨损，结构完整，强度正常。发动机与底盘状况良好。医疗设备运 行正常，医疗消耗品已更替完毕。ECU状况良好。',
	'源石结晶分布于体内， 参照医学检测报告，确认为感染者。',
	'参照医学检测报告，确认为非感染者',
	'外壳有少量磨损，结构完整，强度正常。 发动机与底盘状况良好。攻击设备运行正常，储能装置已填充满，使用正常。ECU状况 良好。',
	'源石结晶分布于体内，且参照医学检测报告，确认为感染者。',
	'体表有少量源石 结晶分布，参照医学检测报告，确认为感染者。',
	'经本人确认，该干员的所有档案移入高权限资料库。',
	'外壳有少量磨损，结构完整，强度正常。发动机与底盘状况良好。 辅助系统运行正常，瞄准装置已校准。使用正常。ECU状况良好。',
	'该干员的感染症状较为特殊，对其开展的临床研究仍在继续。',
	'外壳有少量磨损，结构完整，强度超过正常标准。发动机与底盘状况良好。能量防 护系统运行正常，数据库已更新，使用正常。ECU状况良好。'
];

// 上面data的一个type
interface Data {
	datasets: {
		data: number[];
		backgroundColor: string[];
		label: string;
	}[];
	labels: string[];
}

function randomSix() {
	// 返回一个随机数,成驼峰状分布,范围从0-100
	// 其中到0-50的概率占95%,50-75的概率占4%,75-100的概率占1%
	// 45为概率极大点
	const r = Math.random();
	let six = 0;
	if (r < 0.95) {
		// 修正为0到50的范围
		six = Math.floor(Math.random() * 51);
	} else if (r < 0.99) {
		// 保持50到75的范围不变
		six = Math.floor(Math.random() * 25) + 50;
	} else {
		// 修正为75到100的范围
		six = Math.floor(Math.random() * 26) + 75;
	}
	return six;
}

function changeData(data: Data, six: number[]) {
	// 传入一个data对象和一个六维数组
	// 返回一个新的data对象
	// 用六维数组替换data里的data数组
	const newdata = data;
	newdata.datasets[0].data = six;
	return newdata;
}

// 数组随机函数,传入一个数组,返回数组里一个随机的元素
function randomArrayItem(arr: string[]) {
	return arr[Math.floor(Math.random() * arr.length)];
}
async function randomTalent() {
	// 直接读取talents.json
	// 等待读取完异步函数数据再返回
	const data = await talentRead();
	// 随机返回一个天赋
	// console.log(data)
	const talent = data[Math.floor(Math.random() * data.length)];	// 去除talent的的desctiption字符串里所有的<>及其内部的内容
	talent.description = talent.description.replace(/<[^>]*>/g, '');

	return talent;
}
// 因为星级分布并不是很平均,所以按照123,45,6三组随机后再随机
function randomStar() {
	const r = Math.random();
	let star = 0;
	if (r < 0.3) {
		// 返回1,2,3中随机一个
		star = Math.floor(Math.random() * 3) + 1;
	} else if (r < 0.6) {
		// 返回4,5中随机一个
		star = Math.floor(Math.random() * 2) + 4;
	} else {
		// 返回6
		star = 6;
	}
	return star.toString();
}

async function dataRead() {
	// 读取$lib/opdata.json的数据
	// 使用fetch
	// 返回一个json对象
	const data: All = await fetch(`${base}/opdata.json`)
		.then((response) => response.json())
		.then((data) => {
			return data; // 确保返回数据
		})
		.catch((error) => console.log(error));
	return data;
}

async function talentRead() {
	// 读取$lib/opdata.json的数据
	// 使用fetch
	// 返回一个json对象
	const data: Talent[] = await fetch(`${base}/talents.json`)
		.then((response) => response.json())
		.then((data) => {
			return data; // 确保返回数据
		})
		.catch((error) => console.log(error));
	return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function similarRa(user: any, op: any) {
	// 相似度比对函数
	// 对比user的属性和op的属性
	// 已经全部对应,但是对比rarity时需要转换为数字同时给op的rarity加个1,计算是为user的rarity/op的rarity+1
	// 几个维度平均相似度
	// 返回一个相似度数值
	let sim = 0;
	// console.log(user.faction, op.faction);

	if (user.profession === op.profession) {
		// sim += 0.75;
		if (user.childcar === op.childcar) {
			sim += 1;
		} else {
			sim += 0.75;
		}
	}
	if (user.faction == op.faction) {
		sim += 1;
	}
	if (user.ray === op.ray) {
		sim += 1;
	}
	if (user.ori === op.ori) {
		sim += 1;
	}
	// 计算op和user的稀有度差值,差值范围5-0,差值越大相似度越低,再按比例计算相似度
	const r = Math.abs(Number(user.rarity) - Number(op.rarity) + 1);
	// 5-r/5
	const rasim = Math.abs(5 - r) / 5;
	sim = sim + rasim;
	sim = sim / 5;
	// 处理sim,只保留两位小数
	sim = Math.round(sim * 100) / 100;
	return sim;
}

async function similarOp(user: any) {
	const data = await dataRead();
	const simop = [];
	// data是一个json对象,分成了1,2两个键的数组
	// 1,2均是干员数据的数组
	// 遍历两个数组,对每个干员数据调用similarRa函数

	for (let i = 0; i < data[1].length; i++) {
		// 所有属性再加上一个sim属性存放到simop数组里
		simop.push({
			name: data[1][i].name,
			sim: similarRa(user, data[1][i]),
			faction: data[1][i].faction,
			ray: data[1][i].ray,
			profession: data[1][i].profession,
			ori: data[1][i].ori,
			rarity: data[1][i].rarity,
			childcar: data[1][i].childcar
		});
	}
	for (let i = 0; i < data[2].length; i++) {
		simop.push({
			name: data[2][i].name,
			sim: similarRa(user, data[2][i]),
			faction: data[2][i].faction,
			ray: data[2][i].ray,
			profession: data[2][i].profession,
			ori: data[2][i].ori,
			rarity: data[2][i].rarity,
			childcar: data[2][i].childcar
		});
	}
	// 按相似度排序
	simop.sort((a, b) => {
		return b.sim - a.sim;
	});
	// 返回相似度最高的一个干员
	return [simop[0]];
}
export {
	randomArrayItem,
	similarOp,
	randomStar,
	randomSix,
	changeData,
	dataRead,
	talentRead,
	randomTalent
};
// 常数导出
export { ray, profession, faction, rarity, ori, childcar, six, condition };
// 类导出
export type { Data, CharacterData, All, Talent };
