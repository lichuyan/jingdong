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
		name: "register",
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
                            label:'注册'
                        }
                    ]
                }
            }
       },
        methods:{
	        submitHandler(e){
	        	e.preventDefault();
	        	this.$http.get('/api/register',{params:this.model})
                    .then(res=>{
	                    if(res.success===true){
		                    console.log('注册成功');
                        }else {
		                    console.log('注册失败');
                        }
                    })
                    .catch(err=>{
	                    console.log(err);
                    });
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