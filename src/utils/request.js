import axios from 'axios'
import { ElMessage } from 'element-plus'

const ERROR_MESSAGES = {
	badRequest: '请求错误(400)',
	unauthorized: '未授权,请登录(401)',
	forbidden: '拒绝访问(403)',
	notFound: `请求地址出错: ${'[具体 URL 将在这里被替换]'}`,
	methodNotAllowed: '请求方法未允许(405)',
	requestTimeout: '请求超时(408)',
	internalServerError: '服务器内部错误(500)',
	notImplemented: '服务未实现(501)',
	badGateway: '网络错误(502)',
	serviceUnavailable: '服务不可用(503)',
	gatewayTimeout: '网络超时(504)',
	httpVersionNotSupported: 'HTTP 版本不受支持(505)',
	defaultConnectionError: '连接错误: [原始错误消息]',
	networkError: '网络异常，请检查后重试！',
	serverFailure: '连接到服务器失败，请联系管理员'
}

const service = axios.create({
	baseURL: '', // url = base url + request url+
	// timeout: 50000,
	withCredentials: false // send cookies when cross-domain requests
	// headers: {
	// 	// clear cors
	// 	'Cache-Control': 'no-cache',
	// 	Pragma: 'no-cache'
	// }
})

const setErrorMsg = (error) => {
	if (error && error.response) {
		switch (error.response.status) {
			case 400:
				error.message = ERROR_MESSAGES.badRequest
				break
			case 401:
				error.message = ERROR_MESSAGES.unauthorized
				break
			case 403:
				error.message = ERROR_MESSAGES.forbidden
				break
			case 404:
				error.message = ERROR_MESSAGES.notFound.replace(
					'[具体 URL 将在这里被替换]',
					error.response.config.url
				)
				break
			case 405:
				error.message = ERROR_MESSAGES.methodNotAllowed
				break
			case 408:
				error.message = ERROR_MESSAGES.requestTimeout
				break
			case 500:
				error.message = ERROR_MESSAGES.internalServerError
				break
			case 501:
				error.message = ERROR_MESSAGES.notImplemented
				break
			case 502:
				error.message = ERROR_MESSAGES.badGateway
				break
			case 503:
				error.message = ERROR_MESSAGES.serviceUnavailable
				break
			case 504:
				error.message = ERROR_MESSAGES.gatewayTimeout
				break
			case 505:
				error.message = ERROR_MESSAGES.httpVersionNotSupported
				break
			default:
				error.message = ERROR_MESSAGES.defaultConnectionError.replace(
					'[原始错误消息]',
					error.message
				)
		}
	} else {
		if (error.message === 'Network Error') {
			error.message = ERROR_MESSAGES.networkError
		} else {
			error.message = ERROR_MESSAGES.serverFailure
		}
	}
	return error.message
}

// Request interceptors
service.interceptors.request.use(
	(config) => {
		// 在此处添加请求头等，如添加 token
		// if (store.state.token) {
		// config.headers['Authorization'] = `Bearer ${store.state.token}`
		// }
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// Response interceptors
service.interceptors.response.use(
	async (response) => {
		// await new Promise(resovle => setTimeout(resovle, 3000));
		// if (response.config.loadingInstance) {
		//     response.config.loadingInstance.close();
		// }
		const res = response.data
		if (res.code !== 200) {
			const errorMsg = res.msg || 'Unkonw error'
			// ElMessage.error(errorMsg)
			// return Promise.reject(new Error(res.msg || 'Error'))
			return response.data
		} else {
			return response.data
		}
	},
	(error) => {
		const errorMessage = setErrorMsg(error)
		ElMessage.error(errorMessage)
		return Promise.reject(error)
	}
)

export default service
