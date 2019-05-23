<template>
    <div>
        <img class="headerimg" src="  https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/video/1807/sp2.png" alt="">
        <cube-form
                :model="model"
                :schema="schema"
                @submit="submitHandler">
        </cube-form>
    </div>
</template>

<script>
	export default {
		name: "login",
		data(){
			return {
				model:{username:'',password:''},
				schema:{
					fields:[
						// 用户名配置
						{
							type: 'input',
							modelKey: 'username',
							label: '用户名',
							props: {
								placeholder: '请输入'
							},
							rules: {
								// 校验规则
								required: true,
								type:'string',
								min:3,
								max:15
							},
							// validating when blur
							trigger: 'blur',  // 什么时候监测，输入时，还是失去焦点监测，
							message:{
								required:'用户名不能为空',
								min:'用户名不能少于3个字符',
								max:'用户名不能多于15个字符'
							}
						},
						// 密码配置
						{
							type: 'input',
							modelKey: 'password',
							label: '密码',
							props: {
								placeholder: '请输入',
								type:'password',
								eye:{
									open:false
								}
							},
							rules: {
								// 校验规则
								required: true,
							},
							// validating when blur
							trigger: 'blur',  // 什么时候监测，输入时，还是失去焦点监测，
							message:{
								required:'密码不能为空',
							}
						},
						// 提交按钮
						{
							type:'submit',
							label:'登录'
						}
					]
				}
			}
		},
		methods:{
			async submitHandler(e){
				e.preventDefault();
				try {
					const result= await  this.$http.get('/api/login',{params:this.model}); // http返回的是promise对象
                    console.log('===============',result)
					if(result.code===0){
						alert(result.message);
						// 调用vuex的方法 --因为一刷新就丢失
                        this.$store.commit('settoken',result.token);
                        // 本地存储
						window.localStorage.setItem('token',result.token);

						// 判断路由是否带参，带参就去到重定向参数地址，否则就去首页
                        if(this.$route.query.redirect){
	                        this.$router.push({path: this.$route.query.redirect});
                        }else {
	                        this.$router.push({path: '/botnav/index'});
                        }

                    }else{
						alert(result.message);
					}
                }catch (er){
					console.log(er)
                }
			}
		}
	}
</script>

<style scoped>
    .headerimg{
        height: 150px;
        width: 100%;
    }

</style>