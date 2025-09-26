/**
 * Generate proxy
 * @param list
 */

export function createProxy() {
	return {
		// 字符串简写写法
		// '/foo': 'http://localhost:4567',
		// 选项写法
		// '/api': {
		// 	target: process	.env.VITE_APP_API_BASE_URL || 'http://192.168.8.93:3001',
		// 	changeOrigin: true,
		// 	rewrite: (path) => path.replace(/^\/api/, '')
		// },
		// // 全球指数
		// '/hcm': {
		// 	target: process.env.VITE_APP_API_BASE_URL_HCM || 'http://192.168.8.93:3001',
		// 	changeOrigin: true,
		// 	rewrite: (path) => path.replace(/^\/hcm/, '')
		// },
		// // 时空预测
		// '/pre': {
		// 	target: process.env.VITE_APP_API_BASE_URL_AI || 'http://192.168.8.93:3001',
		// 	changeOrigin: true,
		// 	rewrite: (path) => path.replace(/^\/pre/, '')
		// }
		// 正则表达式写法
		// '^/fallback/.*': {
		// 	target: 'http://jsonplaceholder.typicode.com',
		// 	changeOrigin: true,
		// 	rewrite: (path) => path.replace(/^\/fallback/, '')
		// }
		// 使用 proxy 实例
		// "/api": {
		//   target: "http://jsonplaceholder.typicode.com",
		//   changeOrigin: true,
		//   configure: (proxy, options) => {
		//     // proxy 是 'http-proxy' 的实例
		//   },
		// },
	}
}
