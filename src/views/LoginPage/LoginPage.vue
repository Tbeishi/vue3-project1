<template>
    <div class="loginPage" >
        <div class="loading-overlay" v-if="loading"></div>
        <div class="left" 
        :class="{'active':moveValue}" 
        v-loading="loading" :element-loading-text="moveValue ? '登录中...' : '正在注册中...'"
        fullscreen="true"
        >
            <p class="title">{{ moveValue ? '登录账户' : '创建账户' }}</p>

            <div class="form">
                <!-- 注册表 -->
                <el-form
                    ref="Registerform"
                    status-icon
                    label-width="120px"
                    class="demo-ruleForm"
                    :model = refForm
                    :rules="refRuler"
                    hide-required-asterisk
                    v-if="!moveValue"
                >
                    <el-form-item prop="username">
                    <el-input 
                    v-model="refForm.username" 
                    placeholder="请输入用户名"
                    >
                    <template #prefix>
                        <el-icon><Avatar/></el-icon>
                    </template>
                    </el-input>
                    </el-form-item>
                    <el-form-item 
                    prop="email"
                    >
                    <el-input autocomplete="off" v-model="refForm.email"
                    placeholder="请输入邮箱"
                    >
                    <template #prefix>
                        <el-icon><Message/></el-icon>
                    </template>
                    </el-input>
                    </el-form-item>
                    <el-form-item prop="password"
                    class="password">
                    <el-input
                        type="password"
                        show-password
                        placeholder="请输入密码"
                        v-model="refForm.password"
                    >
                    <template #prefix>
                        <el-icon><Lock /></el-icon>
                    </template>
                    </el-input>
                    </el-form-item>
                    <!-- <el-button>注册</el-button> -->
                </el-form>

                <!-- 登录表 -->
                <el-form
                    ref="Loginform"
                    status-icon
                    label-width="120px"
                    class="demo-ruleForm"
                    :model = refForm
                    :rules="refRuler"
                    hide-required-asterisk
                    v-else
                >
                    <el-form-item prop="username">
                    <el-input 
                    v-model="refForm.username" 
                    placeholder="请输入用户名"
                    >
                    <template #prefix>
                        <el-icon><Avatar/></el-icon>
                    </template>
                    </el-input>
                    </el-form-item>
                    <el-form-item prop="password"
                    class="password">
                    <el-input
                        type="password"
                        show-password
                        placeholder="请输入密码"
                        v-model="refForm.password"
                    >
                    <template #prefix>
                        <el-icon><Lock /></el-icon>
                    </template>
                    </el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" 
                class="loginBtn" 
                color="rgb(0, 179, 210)"
                @click="handle"
                >{{ moveValue ? '登录' : '注册' }}
                </el-button>
            </div>
        </div>
        <div class="right" :class="{'active':moveValue}">
            <p class="welcome">{{ moveValue ? '欢迎，我的朋友！' : '欢迎回来！' }}</p>
            <p class="message">{{ moveValue ? '开始注册，来到我的世界！' : '去登录，进入我的店铺吧！' }}</p>
            <el-button type="primary" class="ToBtn" color="rgba(57, 224, 253, 0.852)" @click="moveValue=!moveValue">{{ moveValue ? '去注册' : '去登录' }}</el-button>
        </div>
    </div>
</template>

<script setup>
import {  ref } from 'vue'
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { Login } from '@/apis/login';
import { Register } from '@/apis/register'
import { Avatar,Lock,Message } from '@element-plus/icons-vue'
const UserStore = useUserStore()
const moveValue = ref(true)
const loading = ref(false)

//准备表单对象
const refForm = ref({
    username:'',
    email:'',
    password:'',
})

const Registerform = ref(null)
const Loginform = ref(null)
const router = useRouter()

const checkEmail = (rule,value,cb)=>{
    const rules = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
	  if(rules.test(value)){
	    //合法的邮箱号
	    return cb();
	  }
	  //邮箱不合法
	cb(new Error('请输入正确的邮箱号'));
}

//准备规则对象
const refRuler = ref({
    username:[{ required: true, message: '账号不能为空', trigger: 'blur' }],
    email:[
        { required: true, message: '邮箱不能为空', trigger: 'blur' },
        {validator: checkEmail, trigger: 'blur'}
    ],
    password:[
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 5, max: 8, message: '密码字符至少为5-8位', trigger: 'blur' }]
})

const doregister = ()=>{
    const {username, email, password} = refForm.value
    Registerform.value.validate(async(valid)=>{
        if(valid){
           loading.value = true
           const res = await Register({username,email,password})
           loading.value = false
           const {status,message} = res.data
           ElMessage({ type: status === 1 ? 'error':'success', message:message})
           if(status === 0) {
            moveValue.value = !moveValue.value
        }
        }
    })
}

const dologin = ()=>{
    const {username, password} = refForm.value
    Loginform.value.validate(async(valid)=>{
        if(valid){
           loading.value = true
           const res = await Login({username,password})
           loading.value = false
           const {status,message,data,token} = res.data
           ElMessage({ type: status === 1 ? 'error':'success', message:message})
           if(status === 0) {
            UserStore.setUserData(data)
            UserStore.setToken(token)
            UserStore.avaterURL = '/src/assets/picture/default.jpg'
            router.replace({path:'/sy'})}
        }
    })
}

const handle = ()=>{
    if(moveValue.value){
        dologin()
    }
    else{
        doregister()
    }
}
</script>

<style scoped lang="less">
.loginPage {
    width: 63vw;
    height: 60vh;
    background-color: #fff;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    border-radius: 20px;
    display: flex;
    overflow: hidden;
    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
    .left{
        height: 100%;
        flex:2;
        transition: all 0.8s;
        &.active{
            transform: translate(21vw);
        }
        .title{
            height: 15vh;
            text-align: center;
            line-height: 15vh;
            font-size: 25px;
            font-weight: 700;
            color:rgb(0, 179, 210)
        }
        .form{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .el-icon{
                font-size: 20px;
            }
        }
    }
    .right{
        width: 21vw;
        background: radial-gradient(circle at 10% 20%, rgb(239, 246, 249) 0%, rgb(206, 239, 253) 90%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: all 0.8s;
        &.active{
            transform: translate(-42vw);
        }
        p{
            margin: 10px 0;
            font-size: 17px;
        }
        .welcome{
            font-size: 28px;
            font-weight: 700;
            color:#3a3a3a
        }
    }
}
::v-deep(.el-input__inner){
    z-index: 5;
}
::v-deep(.el-input__wrapper){
    border-radius:2.5vh;
    background-color: #fbfbfb;
    z-index: 5;
    position: relative;
}
.el-input{
    width: 18vw;
    height: 5vh;
    margin-left: 10px;
    border: none;
}
.el-form-item{
    margin-bottom: 30px;
}
.el-form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 204px;
}

::v-deep(.el-form-item__content ){
    margin: 0 !important;
}

::v-deep(.el-form-item__error){
    margin-top: 5px;
    margin-left: 20px;
}

::v-deep(.el-input__suffix-inner){
    margin-right: 5px;
    color:rgba(0, 168, 106, 0.766);
}
::v-deep(.el-input__icon){
    scale: 2;
    margin-left: 0;
}

::v-deep(.el-input__icon.el-input__password){
    color:rgba(140, 140, 140, 0.766);
    position: absolute;
    z-index: 3;
    background-color: #fbfbfb;
    border-radius: 50%;
    right:15px
}

 
.loginBtn{
    width: 100px;
    height: 40px;
    border-radius: 20px;
    color: rgb(255, 255, 255);
}

.ToBtn{
    margin-top: 25px;
    width: 120px;
    height: 40px;
    border-radius: 20px;
    color: rgb(255, 255, 255);
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0); 
  z-index: 999; 
}
</style>
