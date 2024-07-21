/*
 * @Author: Qmm 1259598502@qq.com
 * @Date: 2024-07-20 11:57:13
 * @LastEditors: Qmm 1259598502@qq.com
 * @LastEditTime: 2024-07-20 12:50:22
 * @FilePath: \JSTS\ForSevMeowple\GamePage\ArkLife\arklife\src\lib\inRange.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { base } from '$app/paths';

async function RangeRead() {
	// 读取$lib/opdata.json的数据
	// 使用fetch
	// 返回一个json对象
	const data = await fetch(`${base}/rangeT.json`)
		.then((response) => response.json())
		.then((data) => {
			return data; // 确保返回数据
		})
		.catch((error) => console.log(error));
	return data;
}

async function GridGet() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const ranges: any[] = [];
	const rangeTable = await RangeRead();
	for (const key in rangeTable) {
		ranges.push(rangeTable[key].grids);
	}
	return ranges;
}



export { GridGet };
