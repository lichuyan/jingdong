import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

 let store=new Vuex.Store({
	// 变量存储库
	state: {
		token: '',
		// cartarry:JSON.parse(localStorage.getItem('cartarry'))||[{title:'ffff',cartCount:0}] // 存储购物车商品的数组
		cartarry:[{title:'ffff',cartCount:0}] // 存储购物车商品的数组
	},
	// 同步方法
	// 调用vuex的方法 --因为一刷新就丢失   this.$store.commit('settoken',result.token)
	mutations: {
		// 设置vuex的token
		settoken(state, token) {
			state.token = token;
		},
		
		//添加商品到购物车
		tocart(state,tag){
			console.log(tag);
			let goods=state.cartarry.find(v=>{
				return v.title===tag.label;
			});
			if(goods){
				goods.cartCount+=1;
			}else{
				let temp={title:tag.label,cartCount:1}
				state.cartarry.push(temp)
			}
			console.log('================',state.cartarry)
		},
		
		// 购物车商品加1
		cartadd(state,index){
			state.cartarry[index].cartCount++;
		},
		
		cartremove(state,index){
			if(	state.cartarry[index].cartCount>1){
				state.cartarry[index].cartCount--;
			}else {
				if(window.confirm("确定删除上面吗")){
					state.cartarry.splice(index,1);
				}
			}
		},
		
		cartclear(state){
			state.cartarry=[];
		}
	},
	// 异步方法
	actions: {},
	// 计算属性 vue的computed vue的计算属性
	getters:{
		countsum:state=>{
			let num=0;
			state.cartarry.forEach(v=>{
				num+=v.cartCount
			})
			return num
		}
	}
});
 // 监听每次调用mutations的时候，都会金这个函数
 store.subscribe((mutations,state)=>{
 	localStorage.setItem('cartarry',JSON.stringify(state.cartarry))
 })
export default store