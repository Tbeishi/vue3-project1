<template>
    <el-drawer 
    v-model="visible"
    @close="cancel"
    >
      <template #header>
        <h4>编辑个人信息</h4>
      </template>
     <div>
        <el-form
            :label-position="left"
            label-width="100px"
            style="max-width: 460px"
            :model="data"
            :rules="rules"
            ref="formRef"
        >
            <el-form-item label="用户名" prop="username">
            <el-input v-model="data.username"/>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
            <el-input v-model="data.phone"/>
            </el-form-item>
            <el-form-item label="位置" prop="address">
            <el-input v-model="data.address"/>
            </el-form-item>
            <el-form-item label="收货地址" prop="addressList">
            <el-input v-model="data.addressList"/>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
            <el-input v-model="data.email"/>
            </el-form-item>
        </el-form>
        <div class="footer">
        <el-button plain @click="cancel">取消</el-button>
        <el-button plain type="primary" @click="submit">确认</el-button>
        </div>
     </div>
    </el-drawer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from '@/store/user';
const UserStore = useUserStore()
const formRef = ref()

onMounted(()=>{
    if(UserStore.userData.addressList.length>0)
    UserStore.userData.deliveryAddress = UserStore.userData.addressList.find(item=>item.default).address
})
const data = ref({
    username: UserStore.userData.username,
    phone:'' || UserStore.userData.phone,
    address:'' || UserStore.userData.address,
    addressList:'' || UserStore.userData.deliveryAddress,
    email:UserStore.userData.email
})
const checkEmail = (rule,value,cb)=>{
    const rules = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
	  if(rules.test(value)){
	    //合法的邮箱号
	    return cb();
	  }
	  //邮箱不合法
	cb(new Error('请输入正确的邮箱号'));
}

const rules = ref({
    username:[{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    phone:[
        { required: true, message: '联系电话不能为空', trigger: 'blur' },
        { min: 11, max: 11, message: '联系电话输入有误', trigger: 'blur' }],
    address:[{ required: true, message: '收货地址不能为空', trigger: 'blur' }],
    addressList:[{ required: true, message: '收货地址不能为空', trigger: 'blur' }],
    email:[
        { required: true, message: '邮箱不能为空', trigger: 'blur' },
        {validator: checkEmail, trigger: 'blur'}
    ],
})
const visible = ref(false)
const openDrawer = ()=>{
    visible.value = true
}

const submit = ()=>{
    formRef.value.validate((valid)=>{
        if(valid){
           const { username,phone,address,addressList,email} = data.value
           UserStore.userData.username = username
           UserStore.userData.phone = phone
           UserStore.userData.address = address
           UserStore.userData.email = email
           UserStore.userData.deliveryAddress = addressList
           if(UserStore.userData.addressList.length>0){
            UserStore.userData.addressList.find(item=>item.default).default = false
           }
           UserStore.userData.addressList.unshift({
            name:username,
            phoneNumber:phone,
            address:addressList,
            default:true
           })
            visible.value = false
        }
    })
}

const cancel = ()=>{
    formRef.value.resetFields()
    visible.value = false
}
defineExpose({
    openDrawer
})
</script>

<style lang="less" scoped>
.footer{
    margin-top: 40px;
    text-align: center;
    .el-button{
        margin-right: 10px;
    }
}
</style>