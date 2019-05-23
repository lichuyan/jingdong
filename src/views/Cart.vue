<template>
    <div>
        <div class="goods" v-for="(item,index) in cartarr" :key="index">
            {{item.title}}
            <div class="goodsright">
                <i class="cubeic-remove" @click="removeCart(index)"></i>
                <span>{{item.cartCount}}</span>
                <i class="cubeic-add" @click="addCart(index)"></i>
            </div>
        </div>
        <cube-button style="margin:10px 0;">下单</cube-button>
        <cube-button @click="clearCart()">清空购物车</cube-button>
    </div>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name: "cart",
        data(){
			return {
                // cartarr:[
                //     {'title':'小米手机',cartCount:4},
                //     {'title':'华为手机',cartCount:6},
                // ]
            }
        },
        computed:{
			// 快速获取store的数据
	        ...mapState({
		        cartarr:state=>state.cartarry
	        })
        },
        methods:{

            // 减少商品
	        removeCart(index){
	        	console.log("=移除",index)
                this.$store.commit('cartremove',index)
            },
	        // 添加商品
	        addCart(index){
		        console.log("=添加",index)
		        this.$store.commit('cartadd',index)
	        },
            // 清空购物车
	        clearCart(){
	        	if(window.confirm("确定清除购物车吗")){
			        this.$store.commit('cartclear');
		        }
            }
        }
	}
</script>

<style lang="stylus" scoped>
    .goods
        padding 10px
        text-align left
        .goodsright
            float  right
        i
            font-size 18px
</style>