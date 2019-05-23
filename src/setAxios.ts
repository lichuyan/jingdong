import axios from 'axios'
import store from './store'
import router from './router';

// http 的全局拦截一系列操作
// token 放在所有请求的header上面带回去给后台

export default function setAxios() {
	// 请求拦截--每次请求有返回的，都是先经过这个拦截器的
	
	// 添加请求拦截器
	axios.interceptors.request.use(
		// 在发送请求之前做的什么
		config=>{
			if(store.state.token) {
				config.headers.token=store.state.token
			}
			return config;
		}
	)
	// 添加响应拦截器
	axios.interceptors.response.use(
		// 对响应数据做的什么
		response=>{
			if(response.status===200) {
				const data=response.data;
				if(data.code==-1){
					// 登录过期，需要重新登录，清空vuex的token和本地存储的token
					store.commit('settoken','');
					window.localStorage.removeItem('token');
					// 跳转到登录页面，用repale，不插入history
					router.replace({path:'/login'});
				}
				return data;
			}
			return response;
		}
	)
}