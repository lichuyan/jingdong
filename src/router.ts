import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Index from '/views/Index.vue'  // 懒加载的不需要导入


Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		// 路由重定向
		{
			path: '/',
			name: 'register',
			redirect: '/login',
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
		},
		{
			path: '/login',
			name: 'login',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			// 路由懒加载--首屏加载空白时间长---秒开
			component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
		},
		{
			path: '/index',
			name: 'index',
			component: () => import(/* webpackChunkName: "about" */ './views/Index.vue'),
		
		},
		{
			path: '/botnav',
			name: 'botnav',
			component: () => import('./views/Botnav.vue'),
			children:[
				{
					path: 'index',
					name: 'index',
					component: () => import('./views/Index.vue'),
				},
				{
					path: 'list',
					name: 'list',
					component: () => import( './views/List.vue'),
					
				},
				{
					path: 'search',
					name: 'search',
					component: () => import('./views/Search.vue'),
					
				},
				{
					path: 'cart',
					name: 'cart',
					meta:{
						requireAuth:true, //有这个字段时，认为这个页面需要登录权限的requireAuthtrue
					},
					component: () => import('./views/Cart.vue'),
				},
				{
					path: 'mine',
					name: 'mine',
					meta:{
						requireAuth:true, //有这个字段时，认为这个页面需要登录权限的requireAuthtrue
					},
					component: () => import( './views/Mine.vue'),
				},
			]
		},
	
	
	],
});
