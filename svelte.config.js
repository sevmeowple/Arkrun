/*
 * @Author: Qmm 1259598502@qq.com
 * @Date: 2024-07-10 14:15:36
 * @LastEditors: Qmm 1259598502@qq.com
 * @LastEditTime: 2024-07-13 20:59:48
 * @FilePath: \JSTS\ForSevMeowple\GamePage\Sudoku\sudoku\svelte.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false
		}),
		paths: {
			base: '/Arkrun'
		},
		appDir: 'app'
	}
};
export default config;
