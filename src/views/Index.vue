<template>
    <div id="index">
        <!--  轮播图-->
        <cube-slide ref="slide" :data="items" @change="changePage">
            <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
                <a :href="item.url">
                    <img class="banner" :src="item.image">
                </a>
            </cube-slide-item>
        </cube-slide>

        <!-- 滚动分类 -->
        <cube-slide   ref="slidelists" :auto-play="false" :data="lists">
            <cube-slide-item v-for="(list, index) in lists" :key="index">
                <ul class="listul">
                    <li class="listli" v-for="(item,index1) in list" :key="index1">
                        <a :href="item.url">
                            <img :src="item.image" alt="">
                            <p>{{item.label}}</p>
                        </a>
                    </li>
                </ul>
            </cube-slide-item>
        </cube-slide>

    </div>
</template>

<script>
	export default {
		name: "index",
		data() {
			return {
				items: [],// 轮播图数组
				lists: [], // 滚动分类数组
			}
		},
		methods: {
			changePage(current) {
				console.log('当前轮播图序号为:' + current)
			},
			clickHandler(item, index) {
				console.log(item, index)
			},
			// 获取轮播图分类
			async getBanner() {
				try {
					const items = await  this.$http.get('/api/banner'); // http返回的是promise对象
					this.items = items.data
				} catch (err) {
					console.log(err)
				}
			},

			// 获取滚动条分类
			async getRolling() {
				try {
					const lists = await  this.$http.get('/api/rollinglist'); // http返回的是promise对象
					this.lists = lists.data;
					console.log('--------------', this.lists)
				} catch (err) {
					console.log(err)
				}
			}
		},
		created() {
			this.getBanner();
			this.getRolling();
		}
	}
</script>

<style scoped>
    #index a .banner {
        display: block;
        width: 100%;
        /*height: 175px;*/
    }
    .listul{
        display: flex;
        flex-wrap: wrap;
    }
    .listli{
        width: 20%;
        justify-content: center;
    }
    .listli img{
        width:35px ;
        height: 35px;
        border-radius: 50%;
        padding: 5px 0;
    }
    .listli p{
       font-size: 14px;
        padding-bottom: 10px;
    }

</style>